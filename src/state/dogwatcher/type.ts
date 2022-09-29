export interface ListDataDog {
    id:string,
    walletName:string,
    walletAddress:string,
    limit:any,
    email:any,
    project: string,
    status:boolean,
    slack:any
}

export interface ItemsPropsDog {
    listDataDog:ListDataDog[];
}