import { Customer } from "./customer";

export interface CustomerPage{
    items: Customer[],
    totalPages: number,
    itemFrom :number,
    itemTo :number,
    totalItemsCount: number
}