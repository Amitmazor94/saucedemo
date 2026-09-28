import { test, expect } from '../fixtures/pom.fixture';
import { users } from '../data/users';

test.describe('Inventory', () => {

  test('sorts items from A to Z', async ({ loginPage, inventoryPage}) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.sortByNameAToZ();
    const names = await inventoryPage.getProductNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    await expect(inventoryPage.sortDropdown).toHaveValue('az');
    expect(names).toEqual(sortedNames);
  });

  test('sorts items from Z to A', async ({ loginPage, inventoryPage}) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.sortByNameZToA();
    const names = await inventoryPage.getProductNames();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    await expect(inventoryPage.sortDropdown).toHaveValue('za');
    expect(names).toEqual(sortedNames);
  });

  test('sorts items from low price to high price', async ({ loginPage, inventoryPage}) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.sortByPriceLowToHigh();
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    await expect(inventoryPage.sortDropdown).toHaveValue('lohi');
    expect(prices).toEqual(sortedPrices);  
  });

  test('sorts items from high price to low price', async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.sortByPriceHighToLow();
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    await expect(inventoryPage.sortDropdown).toHaveValue('hilo');
    expect(prices).toEqual(sortedPrices);
  });
  
});
