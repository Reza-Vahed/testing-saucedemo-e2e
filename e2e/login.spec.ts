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
