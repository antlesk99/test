import type {Page} from "@playwright/test";

import BasePage from "./BasePage";

export default class BasketPage extends BasePage {

    readonly URL = "/basket";

    constructor(page: Page) {
        super(page, ".wrap");
        this.container = page.locator(this.containerLocator);
    }
}