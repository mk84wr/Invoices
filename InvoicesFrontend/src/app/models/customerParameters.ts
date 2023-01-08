export interface CustomerParameters{
    isActive?: boolean,   
    isVisible?: boolean,  
    minSum?: number,
    maxSum?: number,
    numberPerPage?: number,
    page?: number,
    sortBy?: string,
    ascending?: boolean,
    nip?:string,
    name?:string
}