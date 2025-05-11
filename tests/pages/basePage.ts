import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    try {
      if (!url) throw new Error("URL is undefined");
      await this.page.goto(url);
    } catch (error: any) {
      throw new Error(`Navigation failed: ${error.message}`);
    }
  }

  async fillField(selector: string, value: string) {
    try {
      await this.page.waitForSelector(selector);
      await this.page.fill(selector, value);
    } catch (error: any) {
      throw new Error(`Cannot fill field "${selector}": ${error.message}`);
    }
  }

  async getTextContent(selector: string): Promise<string | null> {
    try {
      await this.page.waitForSelector(selector);
      return await this.page.textContent(selector);
    } catch (error: any) {
      throw new Error(`Cannot get text from "${selector}": ${error.message}`);
    }
  }

  async selectDropdownOption(selector: string, value: string) {
    try {
      await this.page.waitForSelector(selector);
      await this.page.selectOption(selector, value);
    } catch (error: any) {
      throw new Error(`Cannot select "${value}" in "${selector}": ${error.message}`);
    }
  }
  async clickElement(selector: string) {
    try {
      await this.page.waitForSelector(selector);
      await this.page.click(selector);
    } catch (error: any) {
      throw new Error(`Cannot click "${selector}": ${error.message}`);
    }
  }

  /**
   * Check if element is visible
   * @param selector - Element selector
   * @returns boolean indicating if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      const element = await this.page.$(selector);
      return element !== null && (await element.isVisible());
    } catch {
      return false;
    }
  }
  
  async wait(ms: number = 1000): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
