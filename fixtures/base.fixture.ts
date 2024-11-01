import {test as base} from "@playwright/test";
import Login from "../page-objects/pages/Login";
import Environment from "../plugins/environment";
import Home from "../page-objects/pages/Home";
import Header from "../page-objects/organisms/Header";
import Basket from "../page-objects/forms/Basket";
import Filters from "../page-objects/organisms/Filters";
import Product from "../page-objects/organisms/Product";
import {BasketResponse} from "../support/types/api/basket";
import BasketPage from "../page-objects/pages/BasketPage";

type Pages = {
    Login: Login,
    Home: Home,
    BasketPage: BasketPage
}

type Components = {
    Header: Header,
    Filters: Filters,
    Product: Product,
    Basket: Basket
}

export const test = base.extend<Pages & Components>({
    page: async ({page}, use) => {
        const responsePromise = page.waitForResponse("https://enotes.pointschool.ru/basket/get");
        const LoginPage = new Login(page);
        const HomePage = new Home(page);
        const Headers = new Header(page);
        const basket = new Basket(page);
        await LoginPage.goto();
        await LoginPage.loginTextField.fill(Environment.account.login);
        await LoginPage.passwordTextField.fill(Environment.account.password);
        await LoginPage.logInButton.click();

        await HomePage.check();
        await Headers.checkIsUserLogin();

        const response = await responsePromise;
        const basketResponse = <BasketResponse>(await response.json());
        if (basketResponse.basketCount > 0) {
            await Headers.basketButton.click();
            await basket.check();
            await basket.clearBasketButton.click();
            await basket.checkCountOfProductsInBasket();
        }
        await use(page);
    },
    Home: async ({page}, use) => {
        await use(new Home((page)));
    },
    Login: async ({page}, use) => {
        await use(new Login((page)));
    },
    BasketPage: async ({page}, use) => {
        await use(new BasketPage((page)));
    },
    Header: async ({page}, use) => {
        await use(new Header((page)));
    },
    Filters: async ({page}, use) => {
        await use(new Filters((page)));
    },
    Product: async ({page}, use) => {
        await use(new Product((page)));
    },
    Basket: async ({page}, use) => {
        await use(new Basket((page)));
    }
});
