import { test, expect } from "@playwright/test";

test.describe("SauceDemo Warenkorb", () => {
  // Läuft vor JEDEM Test in dieser Gruppe: Login als Vorbedingung
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test("Warenkorb: Artikel hinzufügen aktualisiert Zähler", async ({
    page,
  }) => {
    // 1. Artikel über "Add to cart" in den Warenkorb legen
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 2. Prüfen: Der Zähler im Warenkorb-Icon zeigt jetzt "1"
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      "1",
    );
  });

  test("Warenkorb: Artikel entfernen setzt Zähler zurück", async ({ page }) => {
    // 1. Vorbedingung herstellen: Erst einen Artikel hinzufügen,
    //    damit überhaupt etwas zum Entfernen da ist
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 2. Zwischencheck: Zähler steht wirklich auf "1", bevor wir weitermachen
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      "1",
    );

    // 3. Artikel wieder aus dem Warenkorb entfernen
    //    (Der Button ersetzt an derselben Stelle den "Add to cart"-Button)
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    // 4. Prüfen: Der Zähler-Badge ist komplett verschwunden (kein "0"-Text,
    //    sondern das Element wird bei 0 Artikeln unsichtbar)
    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
    ).toBeHidden();
  });
});
