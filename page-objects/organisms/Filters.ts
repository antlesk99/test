import type {Page} from "@playwright/test";

import Button from "../atoms/Button";
import BaseOrganism from "./BaseOrganism";
import Input from "../atoms/Input";

export default class Filters extends BaseOrganism {

    readonly searchByNameInput: Input;
    readonly searchByNameButton: Button;

    constructor(page: Page) {
        super(page, ".note-filters");
        this.container = page.locator(this.containerLocator);
        this.searchByNameInput = new Input(page, '.input-group', this.container);
        this.searchByNameButton = new Button(page, '.input-group .actionSearchFilter', this.container);
    }
}