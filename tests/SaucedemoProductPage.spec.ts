/**
 * @Author: Ketan Tiwari
 * @Date:   2026-04-11
 */

import test from "../fixtures/sauceFixture";

import Logger from "../configfiles/logger";
import type { Logintypes } from "../types/loginTypes";
import fs from "fs";
import { shouldRun, getExecutionMode } from "../Utilities/SuiteManager";

const testData: Logintypes = JSON.parse(
  fs.readFileSync(`./data/user.json`, `utf-8`),
);

test.describe("Saucedemo Product Page Tests", { tag: "@regression" }, () => {

  test.beforeAll(() => {

    test.skip(!shouldRun("Saucedemo Product Page Tests"), "Skipped via Excel");
    
     });
  test.describe.configure({ mode: getExecutionMode("Saucedemo Product Page Tests")  });

  test("Verify All links , Buttons and naviagtions", async ({
    auth,
    productFacade,
    page,
  }, testInfo) => {
    await test.step("Login to the application", async () => {
      await auth.loginAsUser(testData, testInfo);
    });

    await test.step("Verify the product pages Ui elements ", async () => {
      
      await productFacade.verifyDropdown();
      await Logger.infowithScreenshot(
        "verifies the product page dropdown options",
        page,
        testInfo,
        true,
      );
      await Logger.info(
        "Product page dropdown options verified successfully",
        testInfo,
      );
      await productFacade.verifyFooterlinks(testInfo);
    });
  });
});
