import { test } from "fixtures/api.fixture";
import {expect, Page} from '@playwright/test';
import {ProductItem} from "../support/types/api/products";
import apiMethods from "../support/API/apiMethods";

test.describe("API tests", () => {
    test('1 test', async ({ page }) => {
        const countOfProduct = 9;
        const productsOnPage = await apiMethods.getProducts(page);
        // better to get data from all pages, because product with discount can exist only on some another page
        const product: ProductItem | undefined = productsOnPage.products.find((prod: ProductItem) => {
            return prod.discount > 0 && prod.count >= countOfProduct;
        })

        if (product) {
            await apiMethods.addProductToBasket(page, product.id, countOfProduct);
            const basketProducts = await apiMethods.getBasketProducts(page);
            expect(basketProducts.basketCount).toEqual(countOfProduct);
            expect(basketProducts.basket.length).toEqual(1);
            expect(basketProducts.basket[0].count).toEqual(countOfProduct);
            expect(basketProducts.basket[0].price).toEqual(countOfProduct * (product.price - product.discount));
            expect(basketProducts.basketPrice).toEqual(countOfProduct * (product.price - product.discount));
        } else {
            expect(product).not.toBeUndefined();
        }
    });

    async function getProductsList(name: string, count: number, countOfPages: number, page: Page): Promise<ProductItem[]> {
        let productsList: ProductItem[] = [];
        for(let i = 1; i <= countOfPages; i++) {
            const productsOnPage = await apiMethods.getProducts(page, i);
            productsOnPage.products.forEach(prod => {
                if(prod.count >= 1 && prod.name !== name) {
                    productsList.push(prod);
                }
            })

            if (productsList.length >= count) return productsList;
        }

        return productsList;
    }

    test('2 test', async ({ page }) => {
        const countOfProducts = 8;
        const productItems = await apiMethods.getProducts(page);
        const product: ProductItem | undefined = productItems.products.find((prod: ProductItem) => {
            return prod.discount > 0 && prod.count >= 1;
        });

        if (product) {
            await apiMethods.addProductToBasket(page, product.id, 1);
            let countOfAdded = 0;
            let productsList: ProductItem[] = await getProductsList(product?.name, countOfProducts, productItems.pages, page);
            expect(productsList.length).toBeGreaterThanOrEqual( productItems.pages);
            for (let prod of productsList) {
                countOfAdded++;
                await apiMethods.addProductToBasket(page, prod.id, 1);
                if (countOfAdded == countOfProducts) break;
            }

            const basketProducts = await apiMethods.getBasketProducts(page);
            let totalPrice = basketProducts.basket[0].price;
            expect(basketProducts.basketCount).toEqual(countOfProducts + 1);
            expect(basketProducts.basket[0].count).toEqual(1);
            expect(basketProducts.basket[0].name).toEqual(product?.name);
            expect(basketProducts.basket[0].price).toEqual(product?.price - product?.discount);
            for (let i = 0; i < countOfProducts; i++) {
                expect(basketProducts.basket[i + 1].count).toEqual(1);
                expect(basketProducts.basket[i + 1].name).toEqual(productsList[i].name);
                expect(basketProducts.basket[i + 1].price).toEqual(productsList[i].price - productsList[i].discount);
                totalPrice += basketProducts.basket[i + 1].price;
            }
            expect(totalPrice).toEqual(basketProducts.basketPrice);
        } else {
            expect(product).not.toBeUndefined();
        }
    });

    test('3 test', async ({ page }) => {
        const countOfProduct = 1;
        const productsOnPage = await apiMethods.getProducts(page);
        const product: ProductItem | undefined = productsOnPage.products.find((prod: ProductItem) => {
            return prod.discount > 0 && prod.count >= countOfProduct;
        })

        if (product) {
            await apiMethods.addProductToBasket(page, product.id, countOfProduct);
            const basketProducts = await apiMethods.getBasketProducts(page);
            expect(basketProducts.basketCount).toEqual(countOfProduct);
            expect(basketProducts.basket.length).toEqual(countOfProduct);
            expect(basketProducts.basket[0].count).toEqual(countOfProduct);
            expect(basketProducts.basket[0].price).toEqual(product.price - product.discount);
            expect(basketProducts.basketPrice).toEqual(product.price - product.discount);
        } else {
            expect(product).not.toBeUndefined();
        }
    });

    test('4 test', async ({ page }) => {
        const countOfProduct = 1;
        const productsOnPage = await apiMethods.getProducts(page);
        const product: ProductItem | undefined = productsOnPage.products.find((prod: ProductItem) => {
            return prod.discount == 0 && prod.count >= countOfProduct;
        })

        if (product) {
            await apiMethods.addProductToBasket(page, product.id, countOfProduct);
            const basketProducts = await apiMethods.getBasketProducts(page);
            expect(basketProducts.basketCount).toEqual(countOfProduct);
            expect(basketProducts.basket.length).toEqual(countOfProduct);
            expect(basketProducts.basket[0].count).toEqual(countOfProduct);
            expect(basketProducts.basket[0].price).toEqual(product.price);
            expect(basketProducts.basketPrice).toEqual(product.price);
        } else {
            expect(product).not.toBeUndefined();
        }
    });
})
