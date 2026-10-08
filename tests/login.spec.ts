import { test, expect } from '../fixtures/pom.fixture';
import { users } from '../data/users';
import { loginExpectedResults } from '../data/AssertionData';

test.describe('Login', () => {
  
  test('standard user reaches inventory', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventoryPage.title).toHaveText(loginExpectedResults.productsTitle);
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errorMessage).toContainText(loginExpectedResults.lockedOutMessage);
  });

  test('shows an error when the password is empty', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.usernameInput.fill(users.standard.username);
    await expect(loginPage.passwordInput).toHaveValue('');
    await loginPage.clickLogin();
    await expect(loginPage.errorMessage).toHaveText(loginExpectedResults.passwordRequiredMessage);
  });

  test('shows an error when the username is empty', async ({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.usernameInput).toHaveValue('');
    await loginPage.passwordInput.fill(users.standard.password);
    await loginPage.clickLogin();
    await expect(loginPage.errorMessage).toHaveText(loginExpectedResults.usernameRequiredMessage);
  });

  test('shows an error when the username and password are empty', async ({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.usernameInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
    await loginPage.clickLogin();
    await expect(loginPage.errorMessage).toHaveText(loginExpectedResults.usernameRequiredMessage);
  });
});
