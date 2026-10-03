import { test, expect } from '../fixtures/pom.fixture';
import { customer, users} from '../data/users';
import { checkoutExpectedResults } from '../data/AssertionData';

test.describe('Checkout', () => {
  test('buy a product end to end', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    

    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addProductToCart(checkoutExpectedResults.productName);

    await expect(inventoryPage.cartBadge).toHaveText(checkoutExpectedResults.cartBadgeCount);

    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveText([checkoutExpectedResults.productName]);

    await cartPage.clickCheckoutButton();
    await checkoutPage.fillCustomerInfo(customer.firstName, customer.lastName, customer.postalCode);
    await checkoutPage.clickFinisButton();

    await expect(checkoutPage.completeHeader).toHaveText(checkoutExpectedResults.orderCompleteMessage);
  });


});
