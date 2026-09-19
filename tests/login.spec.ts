import { test, expect } from '../fixtures/pom.fixture';
import { users } from '../data/users';

test.describe('Login', () => {
  test.only('standard user reaches inventory', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(inventoryPage.title).toHaveText('Products');
    await page.pause();
    
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });
});
