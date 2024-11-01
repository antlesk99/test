import {APIResponse, Page} from "@playwright/test";
import api from "../constants/api";
import {ProductsResponse} from "../types/api/products";
import {BasketResponse} from "../types/api/basket";

export default class apiMethods {
    static getProducts = async (page: Page, indexOfPage = 0): Promise<ProductsResponse> => {
        const products = await page.request.get(api.GET_PRODUCTS, {
            form: {
                page: indexOfPage,
            }
        });

        return products.json();
    }

    static addProductToBasket = async (page: Page, productIndex: number, productCount: number): Promise<APIResponse> => {
        return await page.request.get(api.ADD_PRODUCT_TO_BASKET, {
            form: {
                product: productIndex,
                count: productCount
            }
        });
    }

    static getBasketProducts = async (page: Page): Promise<BasketResponse> => {
        const products = await page.request.get(api.GET_BASKET_PRODUCTS);

        return products.json();
    }

    static clearBasket = async (page: Page): Promise<APIResponse> => {
        return await page.request.get(api.CLEAR_BASKET);
    }
}