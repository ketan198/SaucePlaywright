/**
 * @Author : Ketan tiwari   
 * @Date : 2026-04-11
 * @Description : This is the information page class which will contain the methods to perform the actions on the information page of the saucedemo application.
 * It will extend the base page class to use the common methods defined in the base page class.  
 */

import type { Locator , Page } from "@playwright/test";  
import type { infopagetypes } from "../types/infopageTypes";
import Asserts from "../Utilities/Asserts";



class infopage  {


    private input_firstName : Locator ; 
    private input_lastName : Locator  ; 
    private input_postalCode : Locator  ; 

    constructor(private page :Page) {  

        this.input_firstName = page.getByPlaceholder("First Name") ; 
        this.input_lastName = page.getByPlaceholder("Last Name")  ;
        this.input_postalCode = page.getByPlaceholder("Zip/Postal Code")  ; 
        
    } 


    async infopageval(data : infopagetypes) : Promise<void> {
        await Asserts.tobeVisible(this.input_firstName , "First Name input field" , true);
        await Asserts.tobeVisible(this.input_lastName , "Last Name input field" , true);
        await Asserts.tobeVisible(this.input_postalCode , "Postal code input field" , true);
        await this.input_firstName.fill(data.fisrt_name);
        await this.input_lastName.fill(data.last_name);
        await this.input_postalCode.fill( data.postal_code);


    }


}