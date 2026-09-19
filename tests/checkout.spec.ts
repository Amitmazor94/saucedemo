import { test, expect } from '../fixtures/pom.fixture';
import { customer, users } from '../data/users';

test.describe('Checkout', () => {
  test('buy a product end to end', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    const productName = 'Sauce Labs Backpack';

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addProductToCart(productName);

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveText([productName]);

    await cartPage.clickCheckoutButton();
    await checkoutPage.fillCustomerInfo(customer.firstName, customer.lastName, customer.postalCode);
    await checkoutPage.clickFinisButton();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});
