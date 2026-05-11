/**
 * @author: Ketan Tiwari
 * @date: 2026-04-11
 * @description: This is the test file which will contain the test cases for the login and products page of the saucedemo application.
 *  It will use the page objects defined in the pages folder to perform the actions on the page.
 * It will also use the test fixtures defined in the fixtures folder to perform the setup and teardown actions for the tests.
 */

import test from "../fixtures/sauceFixture";

import type { Logintypes } from "../types/loginTypes";
import ExcelUtil from "../Utilities/excelUtil";
import type {LoginTestRow} from "../Utilities/excelUtil" ;
import { shouldRun, getExecutionMode } from "../Utilities/SuiteManager";



const loginRows = ExcelUtil.getTestdataarraysheet<LoginTestRow>("LoginTest");

test.describe("LoginTest",{ tag: "@smoke" }, () => {

    test.beforeAll(() => {

    test.skip(!shouldRun("LoginTest"), "Skipped via Excel");

     });
    
    test.describe.configure({ mode: getExecutionMode("LoginTest") });

    for(const row of loginRows){
     
      
      test(`TestID: ${row.TestID} - ${row.Description} `, async ({auth,productFacade}, testInfo) => {

      await test.step("Login to the application", async () => {

        const loginData = {
            username: row.UserName,
            password: row.Password
          };

        await auth.loginAsUser(loginData, testInfo); //using facade to perform login action
        console.log(`Login successful for ${row.TestID}`);
      });

      await test.step("Verify the products page", async () => {
       
        // await productPage.page.goto('https://www.saucedemo.com/inventory.html'); use when usings storagestate  
        await productFacade.verifyproductpage(); //using facade to perform products page verification
      });
    });}
    
  },
);
