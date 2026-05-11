import type { Page } from "@playwright/test";

import type { LoginInterface } from "../Interfaces/LoginInterface";





export default class mocklogin implements LoginInterface{

constructor(page : Page){ 
 
}



async openApp(){

    console.log("hello world") ;

}

async LoginasStandardUser(data: any): Promise<void> {

    console.log("login as standard user") ; }

async captureScreenshot(testInfo: any, name: string): Promise<void> {

    console.log("capture screenshot") ; }   



}