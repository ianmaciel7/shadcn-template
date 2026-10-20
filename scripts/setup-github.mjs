import { execFileSync } from "node:child_process";

// 1. Verify gh CLI authentication
try {
  execFileSync("gh", ["auth", "status"], { stdio: "ignore" });
} catch {
  console.error(
    "Error: GitHub CLI ('gh') is not installed or not authenticated.",
  );
  console.error("Please run 'gh auth login' to authenticate.");
  process.exit(1);
}

// 2. Identify the target repository and default branch
let repo;
let defaultBranch = "main";
try {
  const repoInfo = JSON.parse(
    execFileSync(
      "gh",
      [
        "repo",
        "view",
        "--json",
        "nameWithOwner,defaultBranchRef",
        "-q",
        "{nameWithOwner: .nameWithOwner, defaultBranch: .defaultBranchRef.name}",
      ],
      { encoding: "utf8" },
    ),
  );
  repo = repoInfo.nameWithOwner;
  if (repoInfo.defaultBranch) {
    defaultBranch = repoInfo.defaultBranch;
  }
} catch (err) {
  console.error(
    "Could not determine GitHub repository info:",
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
}

console.log(
  `Configuring GitHub settings for ${repo} (default branch: ${defaultBranch})...`,
);

// 3. Configure repository merge options
try {
  execFileSync(
    "gh",
    [
      "api",
      "--method",
      "PATCH",
      `repos/${repo}`,
      "-f",
      "allow_merge_commit=false",
      "-f",
      "allow_rebase_merge=false",
      "-F",
      "allow_auto_merge=true",
      "-F",
      "delete_branch_on_merge=false",
    ],
    { stdio: "ignore" },
  );
  console.log(
    "✔ Configured pull request merge options (Squash only, Auto-merge enabled).",
  );
} catch (err) {
  console.error(
    "Failed to update repository settings:",
    err instanceof Error ? err.message : err,
  );
}

// 4. Configure branch protection on the default branch
const branchProtectionPayload = JSON.stringify({
  required_status_checks: {
    strict: true,
    contexts: ["CI result"],
  },
  enforce_admins: true,
  required_pull_request_reviews: {
    dismiss_stale_reviews: true,
    require_code_owner_reviews: false,
    require_last_push_approval: false,
    required_approving_review_count: 0,
  },
  restrictions: null,
  required_linear_history: true,
  allow_force_pushes: false,
  allow_deletions: false,
  required_conversation_resolution: true,
});

try {
  execFileSync(
    "gh",
    [
      "api",
      "--method",
      "PUT",
      `repos/${repo}/branches/${defaultBranch}/protection`,
      "--input",
      "-",
    ],
    {
      input: branchProtectionPayload,
      stdio: ["pipe", "ignore", "inherit"],
    },
  );
  console.log(
    `✔ Configured branch protection on '${defaultBranch}' (strict 'CI result' check, linear history, conversation resolution).`,
  );
} catch (err) {
  console.error(
    `Failed to configure branch protection on '${defaultBranch}':`,
    err instanceof Error ? err.message : err,
  );
}
