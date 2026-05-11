
import type { LoginInterface } from "../Interfaces/LoginInterface";
import  LoginPage   from "../pages/loginPage";
import type {Logintypes}  from "../types/loginTypes";
import  test  from "@playwright/test" ;
import type {TestInfo} from "@playwright/test" ;


export class AuthFacade {
  constructor(private loginPage: LoginInterface) {}

  async loginAsUser(data: Logintypes, testInfo?: TestInfo) {
        await test.step("Open Application url and perform login", async () => {
        
        await this.loginPage.openApp();
       if(testInfo){
            await this.loginPage.captureScreenshot(testInfo!, "Login Page Screenshot"); // Capture screenshot of the login page
       } 
        await this.loginPage.LoginasStandardUser(data);
        if(testInfo){
            await this.loginPage.captureScreenshot(testInfo, "Login success"); 
       }
    });

   
    
  }
}