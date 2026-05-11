import {test as setup} from "@playwright/test";


  setup("Login with default user", async ({page}) => {
    
    await page.goto('https://www.saucedemo.com');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
 await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: 'auth.json' });

  
  });   
