import {expect, Locator, Page} from "@playwright/test";

import Button from "../atoms/Button";
import BaseOrganism from "./BaseOrganism";

export default class Header extends BaseOrganism {

    readonly userAvatar: Locator;
    readonly countOfProductsInBasket: Locator;
    readonly basketButton: Button;

    constructor(page: Page) {
        super(page, "#navbarNav");
        this.container = page.locator(this.containerLocator);
        this.userAvatar = this.container.locator(".user-avatar");
        this.countOfProductsInBasket = this.container.locator(".basket-count-items");
        this.basketButton = new Button(page, '#basketContainer', this.container);
    }

    async checkIsUserLogin(): Promise<void> {
        return expect(this.userAvatar).toBeVisible();
    }

    async getCountOfProductsInBasket(): Promise<string> {
        return await this.countOfProductsInBasket.innerText();
    }

    async checkCountOfProductsInBasket(countOfProducts: number): Promise<void> {
        return await expect(this.countOfProductsInBasket).toHaveText(countOfProducts.toString());
    }
}