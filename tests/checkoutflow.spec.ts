/**
 * @author : ketan tiwari
 * @date : 2026-04-11
 * @description : This is the test file which will contain the test cases for the checkout flow of the saucedemo application.
 * It will use the page objects defined in the pages folder to perform the actions on the page.
 * It will also use the test fixtures defined in the fixtures folder to perform the setup and teardown actions for the tests.
 */

import test from "../fixtures/sauceFixture";

import Logger from "../configfiles/logger.js";
import { shouldRun, getExecutionMode } from "../Utilities/SuiteManager";

test.describe("Saucedemo checkout Flow", () => {


  test.beforeAll(() => {

    test.skip(!shouldRun("Saucedemo checkout Flow"), "Skipped via Excel");
    
     });
     
  test("open application and verify the checkout flow", async ({
    loginPage,
    productPage,
    // cartpage
  }, testInfo) => {

    test.step("login to application" , async() => {

         // handled by storage state
    })

    test.step("Add products to cart " ,async() => {
        // await productPage.page.goto('https://www.saucedemo.com/inventory.html');
        // await productPage.addProductTocart()

    });

    test.step("Navigate to cart and verify products in cart"  ,async()=>{

    }); 

    test.step("Proceed to your information page and fill the details" , async() => {

    }) ;

    test.step("Navigate to overview page and verify the deatils " ,async()=>{

    });

    test.step("Click on finish and verify the order confirmation page" , async()=>{

    }); 

    test.step("Click on back home and verify the products page "  ,async()=>{

    }); 

    test.step("Logout from the application" , async() => {


    });

  });
});
