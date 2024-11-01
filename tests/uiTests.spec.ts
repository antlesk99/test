import { test } from "fixtures/base.fixture";
import {ProductItem, ProductsResponse} from "../support/types/api/products";
import {expect} from "@playwright/test";

test.describe("UI tests", () => {
  test('test 1', async ({Home, BasketPage, Product, Header, Basket, page }) => {
    const responsePromise = page.waitForResponse("https://enotes.pointschool.ru/product/get");
    const countOfProducts = 9;

    await Home.goto();
    const response = await responsePromise;
    const productsResponse = <ProductsResponse>(await response.json());
    // better to get data from all pages, because product with discount can exist only on some another page
    const product: ProductItem | undefined = productsResponse.products.find((prod: ProductItem) => {
      return prod.discount > 0 && prod.count >= countOfProducts;
    })

    if (product) {
      await Home.filters.searchByNameInput.fill(product.name);
      await Home.filters.searchByNameButton.click();
      await Home.checkCountOfProducts(1);

      await Product.fillCountOfProduct(countOfProducts);
      await Product.clickBuyProductButton();

      await Header.checkCountOfProductsInBasket(countOfProducts);
      await Header.basketButton.click();
      await Basket.check();
      await Basket.checkCountOfProductsInBasket(1);
      await Basket.checkNameOfProductInBasket(product.name);
      await Basket.checkCountOfProductInBasket(countOfProducts);
      await Basket.checkPriceOfProductInBasket(product.price - product.discount);
      await Basket.checkTotalPrice();
      await Basket.openBasketPage.click();
      await BasketPage.checkError();
    } else {
      expect(product).not.toBeUndefined();
    }
  });

  test('test 2', async ({Home, BasketPage, Product, Header, Basket, page }) => {
    const responsePromise = page.waitForResponse("https://enotes.pointschool.ru/product/get");
    const countOfProducts = 8;

    await Home.goto();
    const response = await responsePromise;
    const productsResponse = <ProductsResponse>(await response.json());
    const countOfPages = productsResponse.pages;
    const countOfProductsOnOnePage = productsResponse.products.length;
    const product: ProductItem | undefined = productsResponse.products.find((prod: ProductItem) => {
      return prod.discount > 0 && prod.count >= 1;
    })

    const productsList: ProductItem[] | undefined = productsResponse.products.filter((prod: ProductItem) => {
      return prod.name != product?.name && prod.count >= 1;
    });

    if (product && productsList) {
      await Home.filters.searchByNameInput.fill(product.name);
      await Home.filters.searchByNameButton.click();
      await Home.checkCountOfProducts(1);
      await Product.clickBuyProductButton(0);

      await Home.filters.searchByNameInput.clear();
      await Home.filters.searchByNameButton.click();
      await Home.checkCountOfProducts(8);
      for (let product of productsList) {
        await Product.clickBuyProductButton(product.id - 1);
      }
      if (productsList.length < countOfProducts) {
        for (let i = 2; i <= countOfPages; i++) {
          const responsePromise = page.waitForResponse("https://enotes.pointschool.ru/product/get");
          await Home.clickOnPageNumber(i);
          const response = await responsePromise;
          const productsResponse = <ProductsResponse>(await response.json());
          for(let product of productsResponse.products) {
            if ( product.count >= 1) {
              productsList.push(product);
              await Product.clickBuyProductButton(product.id - countOfProductsOnOnePage - 1);
            }

            if (productsList.length >= countOfProducts) break;
          }
        }
      }

      await Header.checkCountOfProductsInBasket(countOfProducts + 1);
      await Header.basketButton.click();
      await Basket.check();
      await Basket.checkCountOfProductsInBasket(countOfProducts + 1);
      await Basket.checkNameOfProductInBasket(product.name);
      await Basket.checkCountOfProductInBasket(countOfProducts);
      await Basket.checkPriceOfProductInBasket(product.price - product.discount);
      for (let i = 0; i < countOfProducts; i++) {
        await Basket.checkNameOfProductInBasket(productsList[i].name);
        await Basket.checkCountOfProductInBasket(1);
        await Basket.checkPriceOfProductInBasket(productsList[i].price - productsList[i].discount);
      }
      await Basket.checkTotalPrice();
      await Basket.openBasketPage.click();
      await BasketPage.checkError();
    } else {
      expect(product).not.toBeUndefined();
      expect(productsList).not.toBeUndefined();
    }
  });

  test('test 3', async ({Home, BasketPage, Product, Header, Basket, page }) => {
    const responsePromise = page.waitForResponse("https://enotes.pointschool.ru/product/get");
    const countOfProducts = 1;

    await Home.goto();
    const response = await responsePromise;
    const productsResponse = <ProductsResponse>(await response.json());
    const product: ProductItem | undefined = productsResponse.products.find((prod: ProductItem) => {
      return prod.discount > 0 && prod.count >= countOfProducts;
    })

    if (product) {
      await Home.filters.searchByNameInput.fill(product.name);
      await Home.filters.searchByNameButton.click();
      await Home.checkCountOfProducts(1);

      await Product.fillCountOfProduct(countOfProducts);
      await Product.clickBuyProductButton();

      await Header.checkCountOfProductsInBasket(countOfProducts);
      await Header.basketButton.click();
      await Basket.check();
      await Basket.checkCountOfProductsInBasket(1);
      await Basket.checkNameOfProductInBasket(product.name);
      await Basket.checkCountOfProductInBasket(countOfProducts);
      await Basket.checkPriceOfProductInBasket(product.price - product.discount);
      await Basket.checkTotalPrice();
      await Basket.openBasketPage.click();
      await BasketPage.checkError();
    } else {
      expect(product).not.toBeUndefined();
    }
  });

  test('test 4', async ({Home, BasketPage, Product, Header, Basket, page }) => {
    const responsePromise = page.waitForResponse("https://enotes.pointschool.ru/product/get");
    const countOfProducts = 1;

    await Home.goto();
    const response = await responsePromise;
    const productsResponse = <ProductsResponse>(await response.json());
    const product: ProductItem | undefined = productsResponse.products.find((prod: ProductItem) => {
      return prod.discount == 0 && prod.count >= countOfProducts;
    })

    if (product) {
      await Home.filters.searchByNameInput.fill(product.name);
      await Home.filters.searchByNameButton.click();
      await Home.checkCountOfProducts(1);

      await Product.fillCountOfProduct(countOfProducts);
      await Product.clickBuyProductButton();

      await Header.checkCountOfProductsInBasket(countOfProducts);
      await Header.basketButton.click();
      await Basket.check();
      await Basket.checkCountOfProductsInBasket(1);
      await Basket.checkNameOfProductInBasket(product.name);
      await Basket.checkCountOfProductInBasket(countOfProducts);
      await Basket.checkPriceOfProductInBasket(product.price);
      await Basket.checkTotalPrice();
      await Basket.openBasketPage.click();
      await BasketPage.checkError();
    } else {
      expect(product).not.toBeUndefined();
    }
  });
});
