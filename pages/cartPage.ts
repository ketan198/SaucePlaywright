/**
 * @author : Ketan Tiwari
 * @date : 2026-04-11
 * @description : This is the cart page class which will contain the methods to perform the actions on the cart page of the saucedemo application.
 *  It will extend the base page class to use the common methods defined in the base page class.  
 */

import fs from "fs";  
import type { Locator, Page } from "@playwright/test";  
import type { CartData } from "../types/cartTypes";
import Asserts from "../Utilities/Asserts";
const testData = JSON.parse(fs.readFileSync(`./data/user.json`, `utf-8`)) ; 

class cartPage  {   

    private cart_title : Locator ; 
    private cart_items_price : Locator ;

    constructor(private page :Page) {
        this.cart_title = page.getByText("Your Cart");
        this.cart_items_price = page.getByTestId("inventory-item-price")    ; 
        
    }

    async cartpageval() {
        await this.cart_title.waitFor({ state: "visible" });
        await Asserts.tohaveText(this.cart_title, "Your Cart" , true);


    }

    async getTotalPrice_cart() : Promise<CartData> {

        const prices =  await this.cart_items_price.allTextContents();


        const total = prices.map(p => parseFloat(p.replace("$" , "")))
                            .reduce((sum, price) => sum + price, 0);

        return {total ,
             itemCount : prices.length} ;
    }


    



}

export default cartPage ;