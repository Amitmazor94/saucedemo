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
});
