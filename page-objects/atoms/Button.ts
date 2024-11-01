import type {Locator, Page} from "@playwright/test";

import BaseAtom from "./BaseAtom";

export default class Button extends BaseAtom {

    constructor(page: Page, containerLocator: string, outerContainer?: Locator) {
        super(page, containerLocator, outerContainer);
    }

    async click(index = 0): Promise<void> {
        await this.container.nth(index).click();
    }
}