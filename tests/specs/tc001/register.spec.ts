import { getDateTime } from 'tests/core/utils/getDate';
import { randomNumbers } from 'tests/core/utils/randomNumber';
import { HomePage } from 'tests/pages/homePage';
import { LoginPage } from 'tests/pages/loginPage';
test.describe('User Registration Tests', () => {
  test('Test Case 1: Register User', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    
    // 1. Launch browser and 2. Navigate to url
    await homePage.navigate();
    
    // 3. Verify that home page is visible successfully
    await homePage.verifyHomePageIsVisible();
    
    // 4. Click on 'Signup / Login' button
    await homePage.clickSignupLogin();
    
    // 5. Verify 'New User Signup!' is visible
    await loginPage.verifySignupFormVisible();
    
    // 6. Enter name and email address and 7. Click 'Signup' button
    const timestamp = getDateTime('short'); 
    const randomNum = randomNumbers(3);
    const username = `testuser${timestamp}${randomNum}`;
    const email = `${username}@example.com`;
    
    await loginPage.enterSignupDetails(username, email);
    
    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await loginPage.verifyAccountInfoFormVisible();
    
    // 9-13. Fill all account details and create account
    const password = `Test@${randomNumbers(4)}`;
    const mobileNumber = `+1${randomNumbers(10)}`;
    
    await loginPage.fillAccountInfoForm({
      title: 'Mr',
      password,
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
      mobileNumber
    });
    
    // 14. Verify that 'ACCOUNT CREATED!' is visible
    await loginPage.verifyAccountCreated();
    
    // 15. Click 'Continue' button
    await loginPage.clickContinue();
    
    // 16. Verify that 'Logged in as username' is visible
    await homePage.verifyLoggedInAsUser(username);
    
    // 17. Click 'Delete Account' button
    await homePage.clickDeleteAccount();
    
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await loginPage.verifyAccountDeleted();
    await loginPage.clickContinue();
  });
}); 