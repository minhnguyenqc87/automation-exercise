import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  // Locators
  // Signup locators
  private newUserSignupHeader = ".signup-form > h2";
  private signupNameInput = 'input[data-qa="signup-name"]';
  private signupEmailInput = 'input[data-qa="signup-email"]';
  private signupButton = 'button[data-qa="signup-button"]';

  // Login locators
  private loginHeader = 'h2:has-text("Login to your account")';
  private loginEmailInput = 'input[data-qa="login-email"]';
  private loginPasswordInput = 'input[data-qa="login-password"]';
  private loginButton = 'button[data-qa="login-button"]';

  // Account information form locators
  private accountInfoHeader = 'h2.title:has-text("Enter Account Information")';
  private titleMr = "input#id_gender1";
  private titleMrs = "input#id_gender2";
  private passwordInput = "input#password";
  private daysDropdown = "select#days";
  private monthsDropdown = "select#months";
  private yearsDropdown = "select#years";
  private newsletterCheckbox = "input#newsletter";
  private specialOffersCheckbox = "input#optin";
  private firstNameInput = "input#first_name";
  private lastNameInput = "input#last_name";
  private companyInput = "input#company";
  private address1Input = "input#address1";
  private address2Input = "input#address2";
  private countryDropdown = "select#country";
  private stateInput = "input#state";
  private cityInput = "input#city";
  private zipcodeInput = "input#zipcode";
  private mobileNumberInput = "input#mobile_number";
  private createAccountButton = 'button[data-qa="create-account"]';

  // Account created page locators
  private accountCreatedHeader = 'h2.title:has-text("Account Created!")';
  private continueButton = '[data-qa="continue-button"]';

  // Account deleted page locators
  private accountDeletedHeader = 'h2.title:has-text("Account Deleted!")';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Verify 'New User Signup!' section is visible
   */
  async verifySignupFormVisible() {
    await expect(this.page.locator(this.newUserSignupHeader)).toBeVisible();
  }

  /**
   * Verify 'Login to your account' section is visible
   */
  async verifyLoginFormVisible() {
    await expect(this.page.locator(this.loginHeader)).toBeVisible();
  }

  /**
   * Login with email and password
   * @param email User's email
   * @param password User's password
   */
  async login(email: string, password: string) {
    await this.fillField(this.loginEmailInput, email);
    await this.fillField(this.loginPasswordInput, password);
    await this.clickElement(this.loginButton);
  }

  /**
   * Enter signup credentials and click signup button
   * @param name Username
   * @param email Email address
   */
  async enterSignupDetails(name: string, email: string) {
    await this.fillField(this.signupNameInput, name);
    await this.fillField(this.signupEmailInput, email);
    await this.clickElement(this.signupButton);
  }

  /**
   * Verify account information form is visible
   */
  async verifyAccountInfoFormVisible() {
    await expect(this.page.locator(this.accountInfoHeader)).toBeVisible();
  }

  /**
   * Fill account information form
   * @param userInfo User details for registration
   */
  async fillAccountInfoForm(userInfo: {
    title: "Mr" | "Mrs";
    password: string;
    day: string;
    month: string;
    year: string;
    newsletter: boolean;
    specialOffers: boolean;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    // Title
    if (userInfo.title === "Mr") {
      await this.clickElement(this.titleMr);
    } else {
      await this.clickElement(this.titleMrs);
    }

    // Password
    await this.fillField(this.passwordInput, userInfo.password);

    // Date of birth
    await this.selectDropdownOption(this.daysDropdown, userInfo.day);
    await this.selectDropdownOption(this.monthsDropdown, userInfo.month);
    await this.selectDropdownOption(this.yearsDropdown, userInfo.year);

    // Checkboxes
    if (userInfo.newsletter) {
      await this.clickElement(this.newsletterCheckbox);
    }
    if (userInfo.specialOffers) {
      await this.clickElement(this.specialOffersCheckbox);
    }

    // Address information
    await this.fillField(this.firstNameInput, userInfo.firstName);
    await this.fillField(this.lastNameInput, userInfo.lastName);
    await this.fillField(this.companyInput, userInfo.company);
    await this.fillField(this.address1Input, userInfo.address1);
    await this.fillField(this.address2Input, userInfo.address2);
    await this.selectDropdownOption(this.countryDropdown, userInfo.country);
    await this.fillField(this.stateInput, userInfo.state);
    await this.fillField(this.cityInput, userInfo.city);
    await this.fillField(this.zipcodeInput, userInfo.zipcode);
    await this.fillField(this.mobileNumberInput, userInfo.mobileNumber);

    // Create account
    await this.clickElement(this.createAccountButton);
  }

  /**
   * Verify account created success message
   */
  async verifyAccountCreated() {
    await expect(this.page.locator(this.accountCreatedHeader)).toBeVisible();
  }

  /**
   * Click continue button on account created page
   */
  async clickContinue() {
    await this.clickElement(this.continueButton);
  }

  /**
   * Verify account deleted success message
   */
  async verifyAccountDeleted() {
    await expect(this.page.locator(this.accountDeletedHeader)).toBeVisible();
  }
}
