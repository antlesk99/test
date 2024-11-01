import type {Page} from "@playwright/test";

import Button from "../atoms/Button";
import BaseOrganism from "./BaseOrganism";
import Input from "../atoms/Input";

export default class Product extends BaseOrganism {

    readonly countOfProductsInput: Input;
    readonly buyProductButton: Button;
    readonly index: number;

    constructor(page: Page) {
        super(page, ".note-item");
        this.container = page.locator(this.containerLocator);
        this.countOfProductsInput = new Input(page, ".input-group", this.container);
        this.buyProductButton = new Button(page, ".actionBuyProduct", this.container);
    }

    async getProductName(indexOfProduct = 0): Promise<string> {
        return await this.container.locator(".product_name").nth(indexOfProduct).innerText();
    }

    async getProductsCount(indexOfProduct = 0): Promise<number> {
        return +(await this.container.locator(".product_count").nth(indexOfProduct).innerText());
    }

    async fillCountOfProduct(count = 1, indexOfProduct = 0): Promise<void> {
        await this.countOfProductsInput.clear(indexOfProduct);
        await this.countOfProductsInput.fill(count.toString(), indexOfProduct);
    }

    async clickBuyProductButton(indexOfProduct = 0): Promise<void> {
        await this.buyProductButton.click(indexOfProduct);
    }
}