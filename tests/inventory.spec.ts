import { test, expect } from '../fixtures/pom.fixture';
import { users } from '../data/users';

test.describe('Inventory', () => {
  test('sorts items from A to Z', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.sortByNameAToZ();

    const names = await inventoryPage.getProductNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

    await expect(inventoryPage.sortDropdown).toHaveValue('az');
    expect(names).toEqual(sortedNames);
    await page.pause();
  });
});
