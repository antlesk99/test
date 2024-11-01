import {expect, test as base} from "@playwright/test";
import {BasketResponse} from "../support/types/api/basket";
import apiMethods from "../support/API/apiMethods";
import Environment from "../plugins/environment";

export const test = base.extend({
    page: async ({page}, use) => {
        await page.request.get("https://enotes.pointschool.ru/login", {
            data: `_csrf=Jn39XwRCin8ecq2s1uwerydCgzJTuAYb-yXFc1JYLih0GcgHaAfPB1033uCQtHqCX3PnXCGKT0KYF6tCYBp8RQ==&LoginForm[username]=${Environment.account.login}&LoginForm[password]=${Environment.account.password}&LoginForm[rememberMe]=0&LoginForm[rememberMe]=1&login-button=`
        });

        let basketItems: BasketResponse = await apiMethods.getBasketProducts(page);
        if (basketItems.basketCount > 0) {
            await apiMethods.clearBasket(page);
            basketItems = await apiMethods.getBasketProducts(page);
            expect(basketItems.basketCount).toEqual(0);
        }
        await use(page);
    }
});