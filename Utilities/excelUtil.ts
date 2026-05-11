
import excelToJson from "convert-excel-to-json";


export  interface RegressionRow {
  TestName: string;
  Run: string;
  Mode: string;
}

export interface LoginTestRow {
  TestID: string;
  Issue: number;
  Description: string;
  UserName: string;
  Password: string;
  ErrorMessage?: string;
}
export interface CreateAccountRow {
  TestID: string;
  Issue: number;
  Description: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Password: string;
  ConfirmPassword: string;
}

interface testInterface{

      TestName: string;
        Run: string;
         Mode: string;
         TestID : string
}



export default class ExcelUtil {


    

    public static getTestdataarraysheet<T>(sheet: string) : T[] {
        const result = excelToJson({
            sourceFile : "./data/testdataSauce.xlsx" , 
            columnToKey : {
                '*' : '{{columnHeader}}' 
            }, 
            sheetStubs : true, 
            header : {rows :1} , 
            sheets : [sheet]
        })

        return result[sheet] as T[] ; 
        

    }

    public static getSuitedetails(sheet : string) : RegressionRow[] {

        const result = excelToJson({
            sourceFile : "./data/testdataSauce.xlsx" ,
            columnToKey : {
                '*' : '{{columnHeader}}' , 

            } , 
            sheetStubs : true , 
            header : {rows :1} ,
            sheets : [sheet]  

        })
        
        const testlist : RegressionRow[] = []  ; 
        // process.stdout.write("Creating Suite 0% ");
        
        for(const test of result[sheet]!){ // ! means “I guarantee this is NOT undefined”
           
            if(test.Run !== null && test.Run!== undefined && test.Run.toUpperCase() === "YES" ){
                testlist.push({TestName: test.TestName , Mode : test.Mode , Run : test.Run}) ;

            }
            // process.stdout.write("|");

            

        } 
        if(testlist.length === 0 ){
                throw new Error ( `${sheet} Sheet does not have any test to run `)
            }

        //  process.stdout.write("Creating Suite 100% ");
         return testlist ; 

    }
    

    public static getTestdata<T extends {TestID : string}>(sheet : string , testId : string) : T{
        const testData = this.getTestdataarraysheet<T>(sheet) ; 
        // let found = false ; 
        // let data ; 

        // for(let i = 0 ; i <  testData.length ; i++){

        //     if(testData[i].TestID === testId){
        //         data = testData[i] ; 
        //         found = true ;    
        //     }
        // }
         // optimised version to handle duplicate rows 
            let foundrow :T | null =null ;  
            for (const row of testData){
                if(row.TestID === testId){
                    if(foundrow){
                        throw new Error(`Duplicate TestID '${testId}' found`);
                    }
                    foundrow = row ; 
                    
                }

            }
        if(!foundrow){
            throw new Error(`Test '${testId}' was not found on '${sheet}' sheet`);

        }
        return foundrow ; 


    }




}



