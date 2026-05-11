/**
 * @author: Ketan Tiwari
 * @date: 2026-04-11
 * @description: This is the products page class which will contain the methods to perform the actions on the products page of the saucedemo application.
 *  It will extend the base page class to use the common methods defined in the base page class.  
 */


import * as productpageob from "../pageObjects/productpageObj.js"
import fs from "fs";
import  { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import {Util}  from "../Utilities/util";
import type { TestInfo } from "@playwright/test";
import Asserts from "../Utilities/Asserts";
import { BrowserAction } from "../Utilities/BrowserAction";

const testData = JSON.parse(fs.readFileSync(`./data/user.json`, `utf-8`)) ; 

class ProductsPage  {

  

    private app_logo : Locator;
    private product_title : Locator;
    private product_sort_container : Locator;
    private addtocartbtn : Locator;
    private backtoprocucts_page_link : Locator;
    private cart_button : Locator;
    constructor(private page :Page) {
        this.app_logo = page.locator(productpageob.app_logo);
        this.product_title = page.locator(productpageob.product_title);
        this.product_sort_container = page.locator(productpageob.product_sort_container);
        this.addtocartbtn = page.getByRole('button' , {name: 'Add to cart'});
        this.backtoprocucts_page_link = page.getByRole('button' , {name: 'Back to products'});
        this.cart_button = page.getByTestId('shopping-cart-link')

    }

    async productpageval() {

        await this.app_logo.waitFor({ state: "visible" });
        await this.product_title.waitFor({ state: "visible" });
        await Asserts.tohaveText(this.product_title, testData.productpagetitletext);
        await Asserts.tohaveText(this.app_logo, testData.websiteTitle);

    }

    async verifyproductpageDropdown() {
        await this.product_sort_container.waitFor({ state: "visible" });
        const dropdownOptions = await this.page.locator(productpageob.product_sort_container).locator("option").allTextContents();
        await this.product_sort_container.click();
        
        //screenshot needed here 
        // expect(dropdownOptions).toEqual(testData.sortdropdownoption);
        return dropdownOptions ;

    } 

   
    async verifyfooterlinks(testInfo: TestInfo) {

        const link = new BrowserAction(this.page);
        
        const page = await link.openlinksinnewtab(testData.twitteridentifier);
        await expect(page).toHaveURL(testData.twitterlink);
        
        await Util.captureFullPage(page,testInfo, "Twitter Page Screenshot");
        const twitter_text =  await page.getByTestId(testData.sauseidentifiertwitter).innerText() ;  
        expect(twitter_text).toContain(testData.sausedataTwitter);
        // console.log(testData.sausedataTwitter);
        await page.close();
    }

    async addProductTocart(productname : string) {
        const formatted = productname.toLowerCase().replace(/ /g, "-");
       await this.page.locator(`#add-to-cart-${formatted}`).click();
        


    }

     
  
    async productpageNavigateandadd(productName : string) { 
        await this.page.getByText(productName).click() ;
        await this.addtocartbtn.click() ; 
        await this.backtoprocucts_page_link.click() ;

    }

    async cartpageNaviagtion(){
        await this.cart_button.click();
        await expect(this.page).toHaveURL(testData.cart_url);
    }

    
    async captureScreenshot(testInfo: TestInfo, name: string) {
  await Util.captureFullPage(this.page, testInfo, name);
}



}

export default ProductsPage;