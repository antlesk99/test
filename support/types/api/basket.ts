export type BasketItem = {
    "id": number,
    "name": string,
    "price": number,
    "count": number,
    "poster": string,
    "discount": number
}

export type BasketResponse = {
    response: boolean,
    basket: BasketItem[],
    basketCount: number,
    basketPrice: number
}