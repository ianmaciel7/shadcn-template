import { expect, test } from "@playwright/test";

// Run `pnpm test:visual` to compare against the committed baselines and
// `pnpm test:visual:update` only after reviewing an intentional UI change.
for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`@visual home page in ${colorScheme} mode`, () => {
    test.use({ colorScheme, viewport: { width: 1280, height: 720 } });

    test("matches the baseline screenshot", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

      await expect(page).toHaveScreenshot(`home-${colorScheme}.png`, {
        fullPage: true,
      });
    });
  });
}
