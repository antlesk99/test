import type {Locator, Page} from "@playwright/test";
import {expect} from "@playwright/test";

export default abstract class BaseOrganism {

    readonly page: Page;
    container: Locator;
    selectors: string;
    containerLocator: string;

    protected constructor(page: Page, selectors?: string) {
        this.page = page;
        this.containerLocator = selectors ? selectors : this.selectors;
    }

    async check(): Promise<void> {
        await expect(this.container).toBeVisible();
    }
}