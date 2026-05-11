# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: SaucedemoLogin_Products.spec.ts >> LoginTest >> TestID: TC02_InValidLogin - Login with invalid credentials
- Location: tests\SaucedemoLogin_Products.spec.ts:32:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.app_logo') to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]: standard_user
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]: test3210
        - img [ref=e16]
      - 'heading "Epic sadface: Username and password do not match any user in this service" [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: Username and password do not match any user in this service"
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1   | /**
  2   |  * @author: Ketan Tiwari
  3   |  * @date: 2026-04-11
  4   |  * @description: This is the products page class which will contain the methods to perform the actions on the products page of the saucedemo application.
  5   |  *  It will extend the base page class to use the common methods defined in the base page class.  
  6   |  */
  7   | 
  8   | 
  9   | import * as productpageob from "../pageObjects/productpageObj.js"
  10  | import fs from "fs";
  11  | import  { expect } from "@playwright/test";
  12  | import type { Locator, Page } from "@playwright/test";
  13  | import {Util}  from "../Utilities/util";
  14  | import type { TestInfo } from "@playwright/test";
  15  | import Asserts from "../Utilities/Asserts";
  16  | import { BrowserAction } from "../Utilities/BrowserAction";
  17  | 
  18  | const testData = JSON.parse(fs.readFileSync(`./data/user.json`, `utf-8`)) ; 
  19  | 
  20  | class ProductsPage  {
  21  | 
  22  |   
  23  | 
  24  |     private app_logo : Locator;
  25  |     private product_title : Locator;
  26  |     private product_sort_container : Locator;
  27  |     private addtocartbtn : Locator;
  28  |     private backtoprocucts_page_link : Locator;
  29  |     private cart_button : Locator;
  30  |     constructor(private page :Page) {
  31  |         this.app_logo = page.locator(productpageob.app_logo);
  32  |         this.product_title = page.locator(productpageob.product_title);
  33  |         this.product_sort_container = page.locator(productpageob.product_sort_container);
  34  |         this.addtocartbtn = page.getByRole('button' , {name: 'Add to cart'});
  35  |         this.backtoprocucts_page_link = page.getByRole('button' , {name: 'Back to products'});
  36  |         this.cart_button = page.getByTestId('shopping-cart-link')
  37  | 
  38  |     }
  39  | 
  40  |     async productpageval() {
  41  | 
> 42  |         await this.app_logo.waitFor({ state: "visible" });
      |                             ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  43  |         await this.product_title.waitFor({ state: "visible" });
  44  |         await Asserts.tohaveText(this.product_title, testData.productpagetitletext);
  45  |         await Asserts.tohaveText(this.app_logo, testData.websiteTitle);
  46  | 
  47  |     }
  48  | 
  49  |     async verifyproductpageDropdown() {
  50  |         await this.product_sort_container.waitFor({ state: "visible" });
  51  |         const dropdownOptions = await this.page.locator(productpageob.product_sort_container).locator("option").allTextContents();
  52  |         await this.product_sort_container.click();
  53  |         
  54  |         //screenshot needed here 
  55  |         // expect(dropdownOptions).toEqual(testData.sortdropdownoption);
  56  |         return dropdownOptions ;
  57  | 
  58  |     } 
  59  | 
  60  |    
  61  |     async verifyfooterlinks(testInfo: TestInfo) {
  62  | 
  63  |         const link = new BrowserAction(this.page);
  64  |         
  65  |         const page = await link.openlinksinnewtab(testData.twitteridentifier);
  66  |         await expect(page).toHaveURL(testData.twitterlink);
  67  |         
  68  |         await Util.captureFullPage(page,testInfo, "Twitter Page Screenshot");
  69  |         const twitter_text =  await page.getByTestId(testData.sauseidentifiertwitter).innerText() ;  
  70  |         expect(twitter_text).toContain(testData.sausedataTwitter);
  71  |         // console.log(testData.sausedataTwitter);
  72  |         await page.close();
  73  |     }
  74  | 
  75  |     async addProductTocart(productname : string) {
  76  |         const formatted = productname.toLowerCase().replace(/ /g, "-");
  77  |        await this.page.locator(`#add-to-cart-${formatted}`).click();
  78  |         
  79  | 
  80  | 
  81  |     }
  82  | 
  83  |      
  84  |   
  85  |     async productpageNavigateandadd(productName : string) { 
  86  |         await this.page.getByText(productName).click() ;
  87  |         await this.addtocartbtn.click() ; 
  88  |         await this.backtoprocucts_page_link.click() ;
  89  | 
  90  |     }
  91  | 
  92  |     async cartpageNaviagtion(){
  93  |         await this.cart_button.click();
  94  |         await expect(this.page).toHaveURL(testData.cart_url);
  95  |     }
  96  | 
  97  |     
  98  |     async captureScreenshot(testInfo: TestInfo, name: string) {
  99  |   await Util.captureFullPage(this.page, testInfo, name);
  100 | }
  101 | 
  102 | 
  103 | 
  104 | }
  105 | 
  106 | export default ProductsPage;
```