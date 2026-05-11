import ExcelUtil from "../Utilities/excelUtil";

const suite = ExcelUtil.getSuitedetails("Regression");

// Create fast lookup
const suiteMap = new Map(
  suite.map(t => [t.TestName.toLowerCase(), t])
);

export function shouldRun(testName: string): boolean {
  // console.log( suite);
  // console.log( suiteMap);
  return suiteMap.has(testName.toLowerCase());
}

export function getExecutionMode(testName: string): "parallel" | "serial" {
  return (suiteMap.get(testName.toLowerCase())?.Mode?.toLowerCase() as "parallel" | "serial") || "parallel";
}

// const a = shouldRun("Saucedemo Product Page Tests");
// console.log(a);

