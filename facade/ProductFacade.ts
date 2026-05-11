import test, { type TestInfo } from "@playwright/test";
import type ProductsPage from "../pages/productspage";
import fs from "fs";
import {Util} from "../Utilities/util";
import Asserts from "../Utilities/Asserts";

const testData = JSON.parse(fs.readFileSync(`./data/user.json`, `utf-8`)) ; 

export class ProductFacade {
    constructor(private productspage: ProductsPage) {
        
    }

    async verifyproductpage() {
      await test.step("Verify products page general contents" , async()=>{
            await this.productspage.productpageval() ; 

        });
    }

    async verifyDropdown() {

       await test.step("Verify products page dropdown" , async() =>{

           const actual_ddtext  = await this.productspage.verifyproductpageDropdown() ; 
            Asserts.assertEquals(actual_ddtext , testData.sortdropdownoption , "Dropdown" , true) ;


        });


    }

    async verifyFooterlinks(testInfo : TestInfo) {
        await test.step("Verify products page footer links and naviagtions" , async() =>{
            await this.productspage.verifyfooterlinks(testInfo) ;
        });
    }

    async addmultiProductstocart(testInfo : TestInfo){
       await test.step("Add products to cart and verify the cart count" , async() =>{
            await this.productspage.addProductTocart(testData.productname1);
            await this.productspage.captureScreenshot(testInfo, "Product added to cart") ;
            await this.productspage.productpageNavigateandadd(testData.productname2) ;
            await this.productspage.captureScreenshot(testInfo, "Product added to cart") ;


        });

    }

    
}