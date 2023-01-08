export interface Invoice{
    id? :number, 
    number: string, 
    dateOfInvoice: Date,
    dueDate: Date ,
    settlementDate? : Date, 
    value: number ,
    toPay?: number ,
    customerId: number, 
    categoryId: number,
    customer?: string ,
    category?: string,
    phone?: string 
}