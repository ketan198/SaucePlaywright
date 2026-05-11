import { test } from "@playwright/test";
import type { Page } from "@playwright/test";
import type { TestInfo } from "@playwright/test";


class Logger {  


    static async info(message:string , testInfo : TestInfo ) {
        await test.step(`INFO: ${message}`, async () => {
            await testInfo.attach('INFO',  {
                body : message,
                contentType: 'text/plain'
            })



    }) 

}
    static async infowithScreenshot(
        message : string, 
        page : Page,
         testInfo : TestInfo,
         takescr :boolean = false) : Promise<void> {
        await test.step(`INFO: ${message}`, async () => {
            
            if(takescr) {
                const screenshot = await page.screenshot({ fullPage: true });
                await testInfo.attach('INFO-Screenshot', {
                     body : screenshot,
                     contentType: 'image/png'});
            
            } else {
                await testInfo.attach('INFO',  {
                    body : message,
                    contentType: 'text/plain'
                })
            }


    }) 


    }

}

export default Logger;