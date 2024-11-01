import type {Account} from "../support/types/account";

export default class Environment {

    static get baseUrl(): string {
        return "https://enotes.pointschool.ru";
    }

    static get account(): Account {
        return {login: "test", password: "test"};
    }
}