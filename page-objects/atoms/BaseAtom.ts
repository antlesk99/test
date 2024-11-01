import type {Locator, Page} from "@playwright/test";
import {expect} from "@playwright/test";

export default abstract class BaseAtom {
    readonly page: Page;
    container: Locator;
    readonly containerLocator: string;
    readonly index: number;

    protected constructor(page: Page, containerLocator: string, outerContainer?: Locator) {
        this.page = page;
        this.containerLocator = containerLocator;
        this.container = outerContainer ? outerContainer.locator(containerLocator) : page.locator(containerLocator);
    }

    async check(visible = true): Promise<void> {
        await expect(this.container).toBeVisible({visible});
    }
}
