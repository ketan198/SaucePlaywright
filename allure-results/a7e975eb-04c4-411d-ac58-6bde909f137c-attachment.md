# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: SaucedemoProductPage.spec.ts >> Saucedemo Product Page Tests >> Verify All links , Buttons and naviagtions
- Location: tests\SaucedemoProductPage.spec.ts:19:3

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for getByTestId('social-twitter') to be visible

```

```
Error: page.screenshot: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | import { expect } from '@playwright/test';
  3  | import type { Locator, Page, TestInfo } from '@playwright/test';
  4  | 
  5  |  
  6  |   
  7  | 
  8  | export class Util {
  9  | 
  10 |  
  11 |     
  12 | 
  13 |   /**
  14 |    * Capture full page screenshot and attach to report
  15 |    * @param {import('@playwright/test').Page} page
  16 |    * @param {import('@playwright/test').TestInfo} testInfo
  17 |    * @param {string} name
  18 |    * @returns {Promise<void>}
  19 |    */
  20 |   static async captureFullPage(page: Page , testInfo : TestInfo, name :string = 'full-page') {  //default value for name parameter is full-page
  21 |     
  22 |     await test.step(`Capturing ${name}`, async () => {
  23 |       const screenshot = await page.screenshot({ fullPage: true });
  24 |       await testInfo.attach(name, {
  25 |         body: screenshot,
  26 |         contentType: 'image/png',
  27 |       });
  28 |     });
  29 |   }
  30 |     
  31 | 
  32 |   /**
  33 |    * Capture viewport screenshot and attach to report
  34 |    * @param {import('@playwright/test').Page} page
  35 |    * @param {import('@playwright/test').TestInfo} testInfo
  36 |    * @param {string} name
  37 |    * @returns {Promise<void>}
  38 |    */
  39 |   static async captureViewport(page :Page, testInfo :TestInfo, name :string = 'viewport') {
  40 |     const screenshot = await page.screenshot();
  41 | 
  42 |     await testInfo.attach(name, {
  43 |       body: screenshot,
  44 |       contentType: 'image/png',
  45 |     });
  46 |   }
  47 | 
  48 |   /**
  49 |    * Capture screenshot of a specific element
  50 |    * @param {import('@playwright/test').Locator} locator
  51 |    * @param {import('@playwright/test').TestInfo} testInfo
  52 |    * @param {string} name
  53 |    * @returns {Promise<void>}
  54 |    */
  55 |   static async captureElement(locator :Locator, testInfo : TestInfo, name :string = 'element') {
  56 |     const screenshot = await locator.screenshot();
  57 | 
  58 |     await testInfo.attach(name, {
  59 |       body: screenshot,
  60 |       contentType: 'image/png',
  61 |     });
  62 |   }
  63 | 
  64 |   /**
  65 |    * Capture screenshot only on failure
  66 |    * @param  page
  67 |    * @param  testInfo
  68 |    * @returns {Promise<void>}
  69 |    */
  70 |   static async captureOnFailure(page :Page, testInfo :TestInfo) {
  71 |     if (testInfo.status !== testInfo.expectedStatus) {
> 72 |       const screenshot = await page.screenshot();
     |                                     ^ Error: page.screenshot: Target page, context or browser has been closed
  73 | 
  74 |       await testInfo.attach('failure-screenshot', {
  75 |         body: screenshot,
  76 |         contentType: 'image/png',
  77 |       });
  78 |     }
  79 |   }
  80 | 
  81 | 
  82 |   
  83 | 
  84 | 
  85 | 
  86 | 
  87 | 
  88 | }
  89 | 
  90 | 
```