import {expect, Locator, Page} from "@playwright/test";

import BasePage from "./BasePage";
import Filters from "../organisms/Filters";

export default class Home extends BasePage {

    readonly URL = "";
    readonly products: Locator;
    readonly filters: Filters;
    readonly pagination: Locator;

    constructor(page: Page) {
        super(page, ".site-index");
        this.container = page.locator(this.containerLocator);
        this.products = this.container.locator(".note-list .note-item");
        this.filters = new Filters(this.page);
        this.pagination = this.container.locator(".pagination");
    }

    async checkCountOfProducts(countOfProducts: number): Promise<void> {
        return expect(this.products).toHaveCount(countOfProducts);
    }

    async clickOnPageNumber(pageNumber: number): Promise<void> {
        return await this.pagination.locator(`[data-page-number="${pageNumber}"]`).click();
    }
}