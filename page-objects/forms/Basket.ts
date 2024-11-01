import {expect, Locator, Page} from "@playwright/test";

import Button from "../atoms/Button";
import BaseForm from "./BaseForm";

export default class Basket extends BaseForm {

    readonly openBasketPage: Button;
    readonly clearBasketButton: Button;
    readonly productsInBasket: Locator;
    readonly basketPrice: Locator;

    constructor(page: Page) {
        super(page, "#basketContainer .dropdown-menu");
        this.container = page.locator(this.containerLocator);
        this.productsInBasket = this.container.locator(".basket-item");
        this.basketPrice = this.container.locator(".basket_price");
        this.openBasketPage = new Button(page, '[href="/basket] .btn', this.container);
        this.clearBasketButton = new Button(page, ".actionClearBasket .btn", this.container);
    }

    async checkCountOfProductsInBasket(countOfProducts = 0): Promise<void> {
        return expect(this.productsInBasket).toHaveCount(countOfProducts);
    }

    async checkNameOfProductInBasket(name: string, indexOfProduct = 0): Promise<void> {
        await expect(this.productsInBasket.locator(".basket-item-title").nth(indexOfProduct)).toHaveText(name);
    }

    async getCountOfProductInBasket(indexOfProduct = 0): Promise<string> {
        return await this.productsInBasket.locator(".basket-item-count").nth(indexOfProduct).innerText();
    }

    async checkCountOfProductInBasket(count: number, indexOfProduct = 0): Promise<void> {
        await expect(this.productsInBasket.locator(".basket-item-count").nth(indexOfProduct)).toHaveText(count.toString());
    }

    async checkPriceOfProductInBasket(price: number, indexOfProduct = 0): Promise<void> {
        const countOfProduct = await this.getCountOfProductInBasket(indexOfProduct);
        const priceForProduct= await this.productsInBasket.locator(".basket-item-price").nth(indexOfProduct).innerText();
        expect(+priceForProduct.replace(/[^0-9]/g, '')).toEqual(price * +countOfProduct);
    }

    async checkTotalPrice(): Promise<void> {
        let totalPrice = 0;
        for (let index = 0; index < await this.productsInBasket.count(); index++) {
            const priceForProduct= await this.productsInBasket.locator(".basket-item-price").nth(index).innerText();
            totalPrice += +priceForProduct.replace(/[^0-9]/g, '');
        }
        expect(await this.basketPrice.innerText()).toEqual(totalPrice.toString());
    }
}