import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the localized document title and heading", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("shadcn-template");
    await expect(
      page.getByRole("heading", { level: 1, name: /To get started, edit/ }),
    ).toBeVisible();
  });

  test("opens external links in a new tab without leaking the opener", async ({
    page,
  }) => {
    await page.goto("/");

    for (const name of ["Deploy Now", "Documentation"]) {
      // Base UI's Button renders these anchors with role="button".
      const link = page.getByRole("button", { name });

      await expect(link).toHaveAttribute("href", /^https:\/\//);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test.describe("locale cookie", () => {
    const cases = [
      { locale: "en", heading: /To get started, edit/ },
      { locale: "pt-BR", heading: /Para começar, edite/ },
      { locale: "es", heading: /Para comenzar, edita/ },
    ];

    for (const { locale, heading } of cases) {
      test(`renders the ${locale} messages`, async ({ context, page }) => {
        await context.addCookies([
          { name: "NEXT_LOCALE", value: locale, url: "http://127.0.0.1:3000" },
        ]);
        await page.goto("/");

        await expect(
          page.getByRole("heading", { level: 1, name: heading }),
        ).toBeVisible();
      });
    }

    test("falls back to English for an unsupported locale", async ({
      context,
      page,
    }) => {
      await context.addCookies([
        { name: "NEXT_LOCALE", value: "xx", url: "http://127.0.0.1:3000" },
      ]);
      await page.goto("/");

      await expect(
        page.getByRole("heading", { level: 1, name: /To get started, edit/ }),
      ).toBeVisible();
    });
  });
});
