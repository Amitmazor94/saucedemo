import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async click(target: Locator): Promise<void> {
    await target.click();
  }

  async fill(target: Locator, value: string): Promise<void> {
    await target.fill(value);
  }

  async getText(target: Locator): Promise<string> {
    return (await target.textContent())?.trim() ?? '';
  }

  async waitForVisible(target: Locator): Promise<void> {
    await target.waitFor({ state: 'visible' });
  }

  async isVisible(target: Locator): Promise<boolean> {
    return target.isVisible();
  }
}
