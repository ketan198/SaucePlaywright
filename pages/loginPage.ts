// import BasePage from "./basePage"
import type { Page , Locator, TestInfo} from "@playwright/test"; 
import * as loginpageob from "../pageObjects/loginpageObj"
import  {baseUrl}  from "../configfiles/sauceconfig"
import  fs from "fs";
import type {Logintypes}  from "../types/loginTypes";
import {Util} from "../Utilities/util";
import type { LoginInterface } from "../Interfaces/LoginInterface";





class LoginPage implements LoginInterface {

  private usernameInput : Locator;
  private passwordInput : Locator;
  private loginButton : Locator;

  constructor(private page : Page) {

    this.usernameInput = page.locator(loginpageob.usernameInput);
    this.passwordInput = page.locator(loginpageob.passwordInput);
    this.loginButton = page.locator(loginpageob.loginButton);
    
  }

   
  

  async openApp() {

    await this.page.goto(baseUrl);

  }

  async LoginasStandardUser(data : Logintypes){

    await this.usernameInput.fill(data.username);
    await this.passwordInput.fill(data.password);
    await this.loginButton.click();

}

async captureScreenshot(testInfo: TestInfo, name: string) {
  await Util.captureFullPage(this.page, testInfo, name);
}


}
export default LoginPage;