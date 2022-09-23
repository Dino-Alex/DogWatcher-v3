export interface ListDataDog {
    id:string,
    walletName:string,
    walletAddress:string
    limit:any,
    email:any,
    status:boolean
    slack:any
}

export interface ItemsPropsDog {
    listDataDog:ListDataDog[];
}