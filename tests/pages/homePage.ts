import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  // Locators
  private logo = ".logo img";
  private shopMenu = ".shop-menu";
  private signupLoginButton = "[href='/login']";
  private deleteAccountButton = "[href='/delete_account']";
  private logoutButton = "[href='/logout']";
  private loggedInUser = (username: string) =>
    `.shop-menu .nav > li > a:has-text("Logged in as ${username}")`;

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the home page
   */
  async navigate() {
    await this.page.goto(process.env.DEV_APP_URL || "https://automationexercise.com");
  }

  /**
   * Verify home page is displayed
   */
  async verifyHomePageIsVisible() {
    await expect(this.page.locator(this.logo)).toBeVisible();
    await expect(this.page.locator(this.shopMenu)).toBeVisible();
    await expect(this.page).toHaveTitle("Automation Exercise");
  }

  /**
   * Click on Signup/Login button
   */
  async clickSignupLogin() {
    await this.clickElement(this.signupLoginButton);
  }

  /**
   * Verify user is logged in
   * @param username The username to verify
   */
  async verifyLoggedInAsUser(username: string) {
    await expect(this.page.locator(this.loggedInUser(username))).toBeVisible();
  }

  /**
   * Click Delete Account button
   */
  async clickDeleteAccount() {
    await this.clickElement(this.deleteAccountButton);
  }

  /**
   * Click Logout button
   */
  async logout() {
    await this.clickElement(this.logoutButton);
  }
}
