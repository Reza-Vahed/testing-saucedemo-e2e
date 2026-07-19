import { Page, Locator } from "@playwright/test";

export class LoginPage {
  // 1. LOCATORS: als Klassen-Eigenschaften gespeichert
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  // 2. CONSTRUCTOR: läuft, sobald man "new LoginPage(page)" aufruft
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  // 3. METHODEN: die Aktionen, die man auf dieser Seite ausführen kann
  async goto() {
    await this.page.goto("https://www.saucedemo.com");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
