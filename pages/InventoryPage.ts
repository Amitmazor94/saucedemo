import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
  }

  addToCartButton(productName: string): Locator {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .locator('button');
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.click(this.addToCartButton(productName));
  }

  async openCart(): Promise<void> {
    await this.click(this.cartLink);
  }

  async getCartCount(): Promise<string> {
    return this.getText(this.cartBadge);
  }

  async sortByNameAToZ(): Promise<void> {
    await this.sortDropdown.selectOption('az');
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }
}
