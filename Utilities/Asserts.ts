import {test , expect } from '@playwright/test';
import type { Locator, Page, TestInfo } from '@playwright/test';

export default class Asserts{

    static async tobeVisible(locator :Locator , elementname :string , softAssert = false) {

        test.step(`Asserting visibility of ${elementname}.`, async () => {
            if(softAssert){
                await expect.soft(locator).toBeVisible();
            }else{
                await expect(locator).toBeVisible();
            }
            

        });
  }

  /**
   * 
   * @param value1 
   * @param value2 
   * @param description 
   * @param softAssert 
   */

  public static async assertContains(value1: string, value2: string, description: string, softAssert = false) {
        await test.step(`Verifying that ${description} contains text '${value2}'`, async () => {
            if (softAssert) {
                expect.soft(value1, `'${value1}' is expected to CONTAIN '${value2}'`).toContain(value2);
            } else {
                expect(value1, `'${value1}' is expected to CONTAIN '${value2}'`).toContain(value2);
            }
        });
    }

    
    public static async assertEquals(actual: any, expected: any, description: string, softAssert = false) {

            await test.step(`Verifying that ${description} has text ${expected}`, async () => {
            if (softAssert) {
                expect.soft(actual, `Expected '${expected}' should be EQUAL to Actual '${actual}'`).toEqual(expected);
            } else {
                expect(actual, `Expected '${expected}' should be EQUAL to Actual '${actual}'`).toEqual(expected);
            }
        });

        } ;

    /**
     * 
     * @param locator
     * @param text 
     * @param softAssert 
     */

    public static async tohaveText(locator :Locator, text :string ,softAssert = false) {
        await test.step(`Asserting that element has text ${text}.`, async () => {
            if (softAssert) {
                await expect.soft(locator).toHaveText(text);}
            else{
                await expect(locator).toHaveText(text);
            } 
        }) ;
            
  
  }

} 


