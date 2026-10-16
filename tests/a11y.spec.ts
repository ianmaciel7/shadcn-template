import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const standards = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`@a11y home page in ${colorScheme} mode`, () => {
    test.use({ colorScheme });

    test("has no automatically detectable WCAG A/AA violations", async ({
      page,
    }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      const results = await new AxeBuilder({ page })
        .withTags(standards)
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });
}
