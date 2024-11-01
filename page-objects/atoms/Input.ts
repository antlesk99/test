import type {Locator, Page} from "@playwright/test";

import BaseAtom from "./BaseAtom";

export default class Input<T = string> extends BaseAtom {

    readonly input: Locator;

    constructor(page: Page, containerLocator: string, outerContainer?: Locator) {
        super(page, containerLocator, outerContainer);
        this.input = this.container.locator("input");
    }

    async fill(text: T, index = 0): Promise<void> {
        await this.input.nth(index).pressSequentially(<string>text, {delay: 200});
    }

    async clear(index = 0): Promise<void> {
        await this.input.nth(index).clear();
    }
}