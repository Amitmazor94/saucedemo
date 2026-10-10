import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly removeButton: Locator;
  readonly listOfItems: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productNames = page.locator('[data-test="inventory-item-name"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.listOfItems= page.locator('[data-test="inventory-item"]');
    
  }

  findAddToCartButton(productName: string): Locator {
    return this.listOfItems
      .filter({ hasText: productName })
      .locator('button');
  }

  async clickAddToCartButton(productName: string): Promise<void> {
    await this.click(this.findAddToCartButton(productName));
  }

  async removeProduct(productName: string): Promise<void> {
    await this.click(this.inventoryItems.filter({ hasText: productName }).locator(this.removeButton));
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

  async sortByNameZToA(): Promise<void> {
    await this.sortDropdown.selectOption('za');
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.sortDropdown.selectOption('lohi');
  }

  async sortByPriceHighToLow(): Promise<void> {
    await this.sortDropdown.selectOption('hilo');
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const texts = await this.productPrices.allTextContents();
    return texts.map((text) => Number(text.replace('$', '')));
  }
}
