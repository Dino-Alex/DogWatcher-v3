import axios from "axios"
import { BASE_URL_DATA_ADMIN } from "config"
import { useState } from "react"
import { ItemsPropsDog } from "../type"

export const fetchDataDog =async (): Promise<ItemsPropsDog> => {
    try{
        const {data: response} = await axios.get(`${BASE_URL_DATA_ADMIN}`);
        const converData = response.map((item: any) =>{
            return{
                id:item.id,
                walletName:item.walletName,
                walletAddress:item.walletAddress,
                limit:item.limit,
                email:item.email,
                status:item.status,
                slack:item.slack
            }
        })  
        console.log("convertData", converData)
        return {listDataDog: converData}

    } catch (e) {
        console.log(e);
        return {listDataDog: [{
            id:"0",
            walletName:"",
            walletAddress:"",
            limit:[],
            email:[],
            status:false,
            slack:[]
        }]}
    }
}