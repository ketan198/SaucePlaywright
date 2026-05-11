import type { TestInfo } from "@playwright/test";
import type { Logintypes } from "../types/loginTypes";

export interface LoginInterface {
    openApp(): Promise<void>;
    LoginasStandardUser(data: Logintypes): Promise<void>;
    captureScreenshot(testInfo: TestInfo, name: string): Promise<void>;
}