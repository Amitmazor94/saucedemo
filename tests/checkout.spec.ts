import * as allure from 'allure-js-commons';
import { test, expect } from '../fixtures/pom.fixture';
import { customer, users } from '../data/users';
import { checkoutExpectedResults } from '../data/AssertionData';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage }) => {
    await allure.step('Open the login page and sign in', async () => {
      await loginPage.open();
      await allure.logStep('Login page opened');
      await allure.logStep(`Entering username "${users.standard.username}" and password "${users.standard.password}"`);
      await loginPage.login(users.standard.username, users.standard.password);
      await allure.logStep('Login form submitted');
    });
  });

  test('buy a product end to end', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await allure.step('Add the product to the cart', async () => {
      await inventoryPage.clickAddToCartButton(checkoutExpectedResults.productName);
      await allure.logStep(`Added "${checkoutExpectedResults.productName}" to the cart`);
      await expect(inventoryPage.cartBadge).toHaveText(checkoutExpectedResults.cartBadgeCount);
      await allure.logStep(`Cart badge is "${checkoutExpectedResults.cartBadgeCount}"`);
    });

    await allure.step('Open the cart and verify the product', async () => {
      await inventoryPage.openCart();
      await allure.logStep('Cart page opened');
      await expect(cartPage.cartItems).toHaveText([checkoutExpectedResults.productName]);
      await allure.logStep(`Cart contains "${checkoutExpectedResults.productName}"`);
    });

    await allure.step('Complete checkout', async () => {
      await cartPage.clickCheckoutButton();
      await allure.logStep('Checkout started');
      await checkoutPage.fillCustomerInfo(customer.firstName, customer.lastName, customer.postalCode);
      await allure.logStep(`Customer info entered for "${customer.firstName} ${customer.lastName}"`);
      await checkoutPage.clickFinisButton();
      await allure.logStep('Finish button clicked');
    });

    await allure.step('Verify the order is complete', async () => {
      await expect(checkoutPage.completeHeader).toHaveText(checkoutExpectedResults.orderCompleteMessage);
      await allure.logStep(`Completion message is "${checkoutExpectedResults.orderCompleteMessage}"`);
    });
  });
});
