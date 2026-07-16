import { test, expect } from "@playwright/test";

test.describe("SauceDemo Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Navigation: Warenkorb-Icon führt zur Warenkorbseite", async ({
    page,
  }) => {
    // 1. Auf das Warenkorb-Icon klicken
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 2. Prüfen: URL zeigt jetzt die Warenkorb-Seite
    await expect(page).toHaveURL(/.*cart.html/);
  });
});
