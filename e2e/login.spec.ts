import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("SauceDemo Login", () => {
  // Wird vor jedem Test neu erstellt, damit jeder Test unabhängig läuft
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("Login: Erfolgreicher Login mit standard_user", async ({ page }) => {
    // Login über die LoginPage-Klasse (kein direkter Selektor-Zugriff mehr im Test)
    await loginPage.login("standard_user", "secret_sauce");

    // Prüfen: Weiterleitung zur Inventory-Seite
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("Login: Fehlgeschlagener Login mit locked_out_user", async ({
    page,
  }) => {
    await loginPage.login("locked_out_user", "secret_sauce");

    // Prüfen: Fehlermeldung wird angezeigt
    await expect(
      page.getByText("Epic sadface: Sorry, this user has been locked out."),
    ).toBeVisible();

    // Prüfen: Keine Weiterleitung zur Inventory-Seite
    await expect(page).not.toHaveURL(/.*inventory.html/);
  });

  test("Login: Fehlermeldung bei leeren Feldern", async ({ page }) => {
    // Leere Felder: login() mit leeren Strings aufrufen
    await loginPage.login("", "");

    // Prüfen: Fehlermeldung wird angezeigt
    await expect(
      page.getByText("Epic sadface: Username is required"),
    ).toBeVisible();

    // Prüfen: Keine Weiterleitung zur Inventory-Seite
    await expect(page).not.toHaveURL(/.*inventory.html/);
  });
});

/*
import { test, expect } from "@playwright/test";

test.describe("SauceDemo Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com");
  });

  test("Erfolgreicher Login mit standard_user", async ({ page }) => {
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("Login: Fehlgeschlagener Login mit locked_out_user", async ({
    page,
  }) => {
    await page.getByPlaceholder("Username").fill("locked_out_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByText("Epic sadface: Sorry, this user has been locked out."),
    ).toBeVisible();

    await expect(page).not.toHaveURL(/.*inventory.html/);
  });

  test("Login: Fehlermeldung bei leeren Feldern", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();

    await expect(
      page.getByText("Epic sadface: Username is required"),
    ).toBeVisible();

    await expect(page).not.toHaveURL(/.*inventory.html/);
  });
});
*/
