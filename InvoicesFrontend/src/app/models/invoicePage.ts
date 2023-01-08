import { Invoice } from "./invoice";

export interface InvoicePage{
    items: Invoice[],
    totalPages: number,
    itemFrom :number,
    itemTo :number,
    totalItemsCount: number
}