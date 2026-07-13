import { test, expect } from "@playwright/test";

test.describe("SauceDemo Produktkatalog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Produktkatalog: Alle 6 Artikel sind sichtbar", async ({ page }) => {
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
  });
});
