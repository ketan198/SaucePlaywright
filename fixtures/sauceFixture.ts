import { test as base } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import ProductsPage from "../pages/productspage";
import cartPage from "../pages/cartPage";
import { AuthFacade } from "../facade/AuthFacade";
import { Util } from "../Utilities/util";
import  {ProductFacade} from "../facade/ProductFacade";
import  mocklogin from "../pages/mochLogin";

type MyFixtures = {
  loginPage: LoginPage;
  productPage: ProductsPage;
  cartPage : cartPage
  auth :AuthFacade ; 
  productFacade : ProductFacade ;
  mocklogin : mocklogin ;
};

const test = base.extend<MyFixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page)); // using awqait use() to create an instance of the loginPage class
    // and passing the page object to it. This allows us to use the loginPage object in our tests.
  },

  mocklogin : async({page} , use) => {
    await use(new mocklogin(page)) ;
  }, 

  productPage: async ({ page }, use) => {
    await use(new ProductsPage(page)); // using awqait use() to create an instance of the loginPage class
    // and passing the page object to it. This allows us to use the loginPage object in our tests.
  },
  cartPage : async({page} ,use) => {
    await use(new cartPage(page)) ; 

  } , 
  auth :async({loginPage} ,use) =>{
    await use(new AuthFacade(loginPage)) ;

  } , 
  productFacade : async({productPage} , use) =>{
    await use(new ProductFacade(productPage)) ;
  }



});


test.afterEach(async ({ page }, testInfo) => {

  await Util.captureOnFailure(page, testInfo);

});

export default test;
