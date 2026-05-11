import type {Page ,  Locator} from "@playwright/test";

export class BrowserAction{

    

    constructor(private page :Page) {
        
    }

    async openlinksinnewtab( linkName : string) : Promise<Page> {

    
    const link = this.page.locator("[data-test$="+ linkName + "]"); // hard coded need to chnage later

    await link.waitFor({ state: 'visible' });
    await link.scrollIntoViewIfNeeded();

    const [newPage] = await Promise.all([
       this.page.context().waitForEvent('page'),
      link.click()
    ]);

    await newPage.waitForLoadState();

    return newPage;
    

  }



}