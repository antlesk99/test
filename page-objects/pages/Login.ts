import type {Page} from "@playwright/test";

import Input from "../atoms/Input";
import Button from "../atoms/Button";
import BasePage from "./BasePage";

export default class Login extends BasePage {

    readonly URL = "/login";
    readonly loginTextField: Input;
    readonly passwordTextField: Input;
    readonly logInButton: Button;

    constructor(page: Page) {
        super(page, ".site-login");
        this.container = page.locator(this.containerLocator);
        this.loginTextField = new Input(page, ".field-loginform-username", this.container);
        this.passwordTextField = new Input(page, ".field-loginform-password", this.container);
        this.logInButton = new Button(page, 'button[name="login-button"]', this.container);
    }
}