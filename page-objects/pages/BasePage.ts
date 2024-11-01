import type {Locator, Page} from "@playwright/test";
import {expect} from "@playwright/test";
import Environment from "../../plugins/environment";

export default abstract class BasePage {
    readonly baseUrl = Environment.baseUrl;
    readonly page: Page;
    container: Locator;
    containerLocator: string;
    URL: string;

    protected constructor(page: Page, selectors?: string) {
        this.page = page;
        this.containerLocator = selectors ? selectors : ".container";
    }

    async check(): Promise<void> {
        await expect(this.container).toBeVisible();
    }

    async checkError(error = false): Promise<void> {
        await expect(this.container.locator(".site-error")).toBeVisible({visible: error});
    }

    async goto(): Promise<void> {
        const urlToGo = `${this.baseUrl}${this.URL}`;
        await this.page.goto(urlToGo);
        await this.check();
    }
}