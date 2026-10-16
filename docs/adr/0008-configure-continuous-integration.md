# ADR 0008: Configure continuous integration

- **Status**: Accepted
- **Date**: 2026-10-16
- **Deciders**: ianmaciel7

## Context

ADR 0007 adopted the quality and security toolchain as local-first checks. The
repository now runs those checks in GitHub Actions as well, so the template
needs a recorded CI architecture that works immediately after "Use this
template", without secrets, cloud accounts, or deployment providers.

ADR 0006 (test placement) and the tool choices in ADR 0007 remain in force.
This record supersedes ADR 0007 only where it implies the checks are run solely
on a developer machine (decision 3's "local" framing and the consequence that
security scanning runs locally).

## Decision

1. Run CI in GitHub Actions with three workflows: `ci.yml` (pull requests,
   pushes to `main`, and manual dispatch), the manual `visual-baselines.yml`,
   and `scheduled-quality.yml` (weekly Stryker and Lighthouse, also manual). Deployment workflows are out of scope for the
   template; a derived project adds its own provider-specific CD.
2. Split `ci.yml` into parallel jobs with separate responsibilities:
   - `static`: `pnpm verify:static` (Biome, typecheck, unit tests with coverage
     thresholds, architecture, unused code, duplication, structure, spelling,
     Markdown, Fallow, React Doctor); publishes a coverage summary and artifact.
   - `build`: `pnpm verify:build` (Vitest Browser Mode, production build with
     size budgets, Ladle production build).
   - `e2e`: `pnpm verify:e2e` (functional, axe-core accessibility, and visual
     tests) inside the pinned Playwright container, uploading the report and
     `test-results/` for seven days.
   - `security`: Semgrep rule tests and scan with `--error`, Gitleaks,
     actionlint, zizmor, `pnpm audit`, and `pre-commit run --all-files`.
   - `pr-title`: validates the pull request title with Commitlint, passing it
     through the environment rather than interpolating it into a script.
   - `ci-result`: aggregates the jobs into one required status check.
   Unit coverage runs once, in `static`, and Fallow reuses it.
3. Harden every workflow: `contents: read` permissions, third-party Actions
   pinned to full commit SHAs with version comments, `persist-credentials:
   false`, job timeouts, and `HUSKY=0`. Gitleaks and actionlint binaries are
   downloaded at pinned versions and verified with SHA-256; Python tools are
   pinned in the `pip install` line. Dependabot keeps npm and Action versions
   current without auto-merging.
4. Pin the Playwright container image by tag and digest and keep it in sync with
   the installed `@playwright/test` version. Visual baselines are generated and
   compared only in that image; `visual-baselines.yml` regenerates them
   manually and publishes them as an artifact for review and commit.
5. Cancel superseded runs per workflow and ref only for pull requests; pushes
   to `main` always complete. Never cancel the baseline workflow, so a
   regeneration run is not lost midway.
6. Fetch full history (`fetch-depth: 0`) only in jobs that read it: `static`
   for Fallow hotspot analysis and `security` for Gitleaks.
7. Use only free, open-source tooling and no external service accounts or
   repository secrets. The default `github.token` is used read-only for
   zizmor's online audits.

## Consequences

- **Positive**: every check that gates a commit locally also gates a pull
  request, and security checks run in parallel with the build and E2E jobs.
- **Positive**: a generated repository gets working CI with no configuration.
- **Negative**: each job installs dependencies, and `build` also installs
  Chromium; this costs runner time in exchange for parallelism and a
  deterministic visual environment.
- **Negative**: Dependabot updates npm packages and Action SHAs directly. It
  reaches the Playwright image and the pip-installed tools only through mirror
  files in `.github/dependabot-mirror/`, whose bumps must be copied into the
  workflows by hand; Gitleaks and actionlint versions are fully manual.
- **Negative**: the weekly Lighthouse job is report-only and its runner setup
  has not yet run on a hosted runner; Stryker takes tens of minutes.

## Alternatives considered

- Run everything in one job: rejected because it serializes independent checks
  and mixes the Playwright container with the general runner.
- Use `pull_request_target` or deployment-coupled workflows: rejected for
  security and provider-independence reasons.
- Add a paid or hosted analysis service: rejected to keep the template free and
  account-independent.

## References

- [GitHub Actions security hardening](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
- [GitHub Actions workflow syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)
- [Playwright continuous integration](https://playwright.dev/docs/ci)
- [Playwright Docker images](https://playwright.dev/docs/docker)
- [zizmor](https://docs.zizmor.sh/)
- [actionlint](https://github.com/rhysd/actionlint)
