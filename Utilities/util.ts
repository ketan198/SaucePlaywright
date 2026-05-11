import { test } from '@playwright/test';
import { expect } from '@playwright/test';
import type { Locator, Page, TestInfo } from '@playwright/test';

 
  

export class Util {

 
    

  /**
   * Capture full page screenshot and attach to report
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   * @param {string} name
   * @returns {Promise<void>}
   */
  static async captureFullPage(page: Page , testInfo : TestInfo, name :string = 'full-page') {  //default value for name parameter is full-page
    
    await test.step(`Capturing ${name}`, async () => {
      const screenshot = await page.screenshot({ fullPage: true });
      await testInfo.attach(name, {
        body: screenshot,
        contentType: 'image/png',
      });
    });
  }
    

  /**
   * Capture viewport screenshot and attach to report
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').TestInfo} testInfo
   * @param {string} name
   * @returns {Promise<void>}
   */
  static async captureViewport(page :Page, testInfo :TestInfo, name :string = 'viewport') {
    const screenshot = await page.screenshot();

    await testInfo.attach(name, {
      body: screenshot,
      contentType: 'image/png',
    });
  }

  /**
   * Capture screenshot of a specific element
   * @param {import('@playwright/test').Locator} locator
   * @param {import('@playwright/test').TestInfo} testInfo
   * @param {string} name
   * @returns {Promise<void>}
   */
  static async captureElement(locator :Locator, testInfo : TestInfo, name :string = 'element') {
    const screenshot = await locator.screenshot();

    await testInfo.attach(name, {
      body: screenshot,
      contentType: 'image/png',
    });
  }

  /**
   * Capture screenshot only on failure
   * @param  page
   * @param  testInfo
   * @returns {Promise<void>}
   */
  static async captureOnFailure(page :Page, testInfo :TestInfo) {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot();

      await testInfo.attach('failure-screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  }


  





}

