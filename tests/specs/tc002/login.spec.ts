import { test } from '@playwright/test';
import { randomNumbers } from '../../core/utils/randomNumber';
import { HomePage } from '../../pages/homePage';
import { LoginPage } from '../../pages/loginPage';
import { getDateTime } from 'tests/core/utils/getDate';
test.describe('User Login Tests', () => {
  // This variable will store user credentials for use across tests
  let testUser = {
    username: '',
    email: '',
    password: ''
  };

  // Pre-Condition: Register a new user before testing login
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    
    // Navigate to the website
    await homePage.navigate();
    await homePage.verifyHomePageIsVisible();
    
    // Go to signup page
    await homePage.clickSignupLogin();
    await loginPage.verifySignupFormVisible();
    
    // Create unique credentials
    const timestamp = getDateTime('short');
    const randomNum = randomNumbers(3);
    testUser.username = `testuser${timestamp}${randomNum}`;
    testUser.email = `${testUser.username}@example.com`;
    testUser.password = `Test@${randomNumbers(4)}`;
    
    // Register new user
    await loginPage.enterSignupDetails(testUser.username, testUser.email);
    await loginPage.verifyAccountInfoFormVisible();
    
    // Fill account details
    await loginPage.fillAccountInfoForm({
      title: 'Mr',
      password: testUser.password,
      day: '15',
      month: '6',
      year: '1990',
      newsletter: true,
      specialOffers: true,
      firstName: 'Test',
      lastName: 'User',
      company: 'Test Company',
      address1: '123 Test Street',
      address2: 'Apartment 456',
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      zipcode: '94102',
      mobileNumber: `+1${randomNumbers(10)}`
    });
    
    // Verify account created and continue
    await loginPage.verifyAccountCreated();
    await loginPage.clickContinue();
    
    // Verify logged in, then logout
    await homePage.verifyLoggedInAsUser(testUser.username);
    
    // Log out
    await homePage.logout();
  });

  test('Test Case 2: Login User with correct email and password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    
    // 1-2. Launch browser and navigate to url (handled by homepage.navigate())
    await homePage.navigate();
    
    // 3. Verify that home page is visible successfully
    await homePage.verifyHomePageIsVisible();
    
    // 4. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();
    
    // 5. Verify 'Login to your account' is visible
    await loginPage.verifyLoginFormVisible();
    
    // 6-7. Enter correct email address and password and click login
    await loginPage.login(testUser.email, testUser.password);
    
    // 8. Verify that 'Logged in as username' is visible
    await homePage.verifyLoggedInAsUser(testUser.username);
    
    // 9. Click 'Delete Account' button
    await homePage.clickDeleteAccount();
    
    // 10. Verify that 'ACCOUNT DELETED!' is visible
    await loginPage.verifyAccountDeleted();
    await loginPage.clickContinue();
  });
}); 