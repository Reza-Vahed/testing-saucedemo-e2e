import { test, expect } from "@playwright/test";

test.describe("SauceDemo Warenkorb", () => {
  test.beforeEach(async ({ page }) => {
    // Login wie gehabt
    await page.goto("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Warenkorb: Artikel hinzufügen aktualisiert Zähler", async ({
    page,
  }) => {
    // 1. Auf "Add to cart" klicken (data-test="add-to-cart-sauce-labs-backpack")
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // 2. Prüfen: shopping-cart-badge zeigt "1"
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      "1",
    );
  });
});
