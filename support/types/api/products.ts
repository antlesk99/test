export type ProductItem = {
    "id": number,
    "name": string,
    "type": string,
    "price": number,
    "discount": number,
    "count": number,
    "poster": string
}

export type ProductsResponse = {
    response: boolean,
    error: string
    products: ProductItem[],
    page: number,
    pages: number
}