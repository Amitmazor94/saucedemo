import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.cartItems = page.locator('[data-test="inventory-item-name"]');
  }

  async getItemNames(): Promise<string[]> {
    return this.cartItems.allTextContents();
  }

  async clickCheckoutButton(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
  }
}
