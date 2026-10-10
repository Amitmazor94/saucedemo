import * as allure from 'allure-js-commons';
import { test, expect } from '../fixtures/pom.fixture';
import { users } from '../data/users';
import { loginExpectedResults } from '../data/AssertionData';

test.describe('Login', () => {


  test('standard user reaches inventory', async ({ loginPage, inventoryPage, page }) => {
    await allure.step('Open the login page', async () => {
      await loginPage.open();
      await allure.logStep('Login page opened');
    });

    await allure.step('Log in as the standard user', async () => {
      await allure.logStep(`Entering username "${users.standard.username}, Entering password "${users.standard.username}"`);
      await loginPage.login(users.standard.username, users.standard.password);
      await allure.logStep('Login form submitted');
    });

    await allure.step('Verify the inventory page is shown', async () => {
      await expect(inventoryPage.title).toHaveText(loginExpectedResults.productsTitle);
      await allure.logStep(`Inventory title is "${loginExpectedResults.productsTitle}"`);
    });
  });


  test('locked out user sees an error', async ({ loginPage }) => {
    await allure.step('Open the login page', async () => {
      await loginPage.open();
      await allure.logStep('Login page opened');
    });

    await allure.step('Log in as the locked out user', async () => {
      await allure.logStep(`Login with invalid user credentials: username- "${users.lockedOut.username}", password- "${users.lockedOut.password}"`);
      await loginPage.login(users.lockedOut.username, users.lockedOut.password);
      await allure.logStep('Login form submitted');
    });

    await allure.step('Verify the locked out error', async () => {
      await expect(loginPage.errorMessage).toContainText(loginExpectedResults.lockedOutMessage);
      await allure.logStep(`Error contains "${loginExpectedResults.lockedOutMessage}"`);
    });
  });


  test('shows an error when the password is empty', async ({ loginPage }) => {
    await allure.step('Open the login page', async () => {
      await loginPage.open();
      await allure.logStep('Login page opened');
    });

    await allure.step('Enter a username and leave the password empty', async () => {
      await loginPage.usernameInput.fill(users.standard.username);
      await allure.logStep(`Username set to "${users.standard.username}"`);
      await expect(loginPage.passwordInput).toHaveValue('');
      await allure.logStep('Password field is empty');
    });

    await allure.step('Submit the login form', async () => {
      await loginPage.clickLogin();
      await allure.logStep('Login button clicked');
    });

    await allure.step('Verify the password required error', async () => {
      await expect(loginPage.errorMessage).toHaveText(loginExpectedResults.passwordRequiredMessage);
      await allure.logStep(`Error is "${loginExpectedResults.passwordRequiredMessage}"`);
    });
  });


  test('shows an error when the username is empty', async ({ loginPage }) => {
    await allure.step('Open the login page', async () => {
      await loginPage.open();
      await allure.logStep('Login page opened');
    });

    await allure.step('Leave the username empty and enter a password', async () => {
      await expect(loginPage.usernameInput).toHaveValue('');
      await allure.logStep('Username field is empty');
      await loginPage.passwordInput.fill(users.standard.password);
      await allure.logStep('Password entered');
    });

    await allure.step('Submit the login form', async () => {
      await loginPage.clickLogin();
      await allure.logStep('Login button clicked');
    });

    await allure.step('Verify the username required error', async () => {
      await expect(loginPage.errorMessage).toHaveText(loginExpectedResults.usernameRequiredMessage);
      await allure.logStep(`Error is "${loginExpectedResults.usernameRequiredMessage}"`);
    });
  });

  
  test('shows an error when the username and password are empty', async ({ loginPage }) => {
    await allure.step('Open the login page', async () => {
      await loginPage.open();
      await allure.logStep('Login page opened');
    });

    await allure.step('Confirm both fields are empty', async () => {
      await expect(loginPage.usernameInput).toHaveValue('');
      await expect(loginPage.passwordInput).toHaveValue('');
      await allure.logStep('Username and password fields are empty');
    });

    await allure.step('Submit the login form', async () => {
      await loginPage.clickLogin();
      await allure.logStep('Login button clicked');
    });

    await allure.step('Verify the username required error', async () => {
      await expect(loginPage.errorMessage).toHaveText(loginExpectedResults.usernameRequiredMessage);
      await allure.logStep(`Error is "${loginExpectedResults.usernameRequiredMessage}"`);
    });
  });
});
