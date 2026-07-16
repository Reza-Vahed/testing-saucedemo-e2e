import { test, expect } from "@playwright/test";

test.describe("SauceDemo Checkout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Checkout: Vollständiger Kaufprozess erfolgreich", async ({ page }) => {
    // 1. Artikel hinzufügen
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 2. Zum Warenkorb navigieren
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 3. Checkout starten
    await page.locator('[data-test="checkout"]').click();

    // 4. Formular ausfüllen (First Name, Last Name, Zip Code)
    await page.locator('[data-test="firstName"]').fill("Max");
    await page.locator('[data-test="lastName"]').fill("Mustermann");
    await page.locator('[data-test="postalCode"]').fill("12345");

    // 5. Continue klicken
    await page.locator('[data-test="continue"]').click();
  });

  test("Checkout: Fehlermeldung bei leeren Pflichtfeldern", async ({
    page,
  }) => {
    // 1. Artikel hinzufügen
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // 2. Zum Warenkorb navigieren
    await page.locator('[data-test="shopping-cart-link"]').click();
    // 3. Checkout starten
    await page.locator('[data-test="checkout"]').click();
    // 4. OHNE Formular auszufüllen direkt auf "Continue" klicken
    await page.locator('[data-test="continue"]').click();
    // 5. Prüfen: Fehlermeldung "Error: First Name is required" sichtbar
    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Error: First Name is required",
    );
    // 6. Prüfen: Keine Weiterleitung zur Übersichtsseite (Negativ-Assertion)
    await expect(page).not.toHaveURL(/.*checkout-step-two.html/);
  });
});
