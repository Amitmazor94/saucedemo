import { test, expect } from '../fixtures/pom.fixture';
import { users } from '../data/users';
import { inventoryExpectedResults } from '../data/AssertionData';

test.describe('Inventory', () => {

  test.beforeEach(async({loginPage})=>{
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  })

  test('sorts items from A to Z', async ({inventoryPage}) => {
    await inventoryPage.sortByNameAToZ();
    const names = await inventoryPage.getProductNames();
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
    await expect(inventoryPage.sortDropdown).toHaveValue(inventoryExpectedResults.sortNameAToZ);
    expect(names).toEqual(sortedNames);
  });

  test('sorts items from Z to A', async ({inventoryPage}) => {
    await inventoryPage.sortByNameZToA();
    const names = await inventoryPage.getProductNames();
    const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
    await expect(inventoryPage.sortDropdown).toHaveValue(inventoryExpectedResults.sortNameZToA);
    expect(names).toEqual(sortedNames);
  });

  test('sorts items from low price to high price', async ({inventoryPage}) => {
    await inventoryPage.sortByPriceLowToHigh();
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    await expect(inventoryPage.sortDropdown).toHaveValue(inventoryExpectedResults.sortPriceLowToHigh);
    expect(prices).toEqual(sortedPrices);  
  });

  test('shows the cart badge after adding a product', async ({inventoryPage }) => {
    await inventoryPage.addProductToCart(inventoryExpectedResults.productName);
    await expect(inventoryPage.cartBadge).toHaveText(inventoryExpectedResults.cartBadgeCount);
  });

  test('sorts items from high price to low price', async ({inventoryPage}) => {
    await inventoryPage.sortByPriceHighToLow();
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    await expect(inventoryPage.sortDropdown).toHaveValue(inventoryExpectedResults.sortPriceHighToLow);
    expect(prices).toEqual(sortedPrices);
  });
  
});
