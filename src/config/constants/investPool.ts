import contracts from "./contracts"
import tokens from "./tokens"

export const investPool = [
    {
        storeID:1,
        storeName:"Fundgo Store",
        revenue:"30%",
        apy:"20%",
        depositFee:"2%",
        tokenStake:tokens.Run,
        tokenEarn:tokens.busd,
        storeLocation:"81 Nguyen Hien Street, An Khanh, Ninh Kieu, Can Tho city",
        storeContract:contracts.poolProposals,
        startPool:1662516199000,
        endPool:1694052199000,
        poolStoreContract:contracts.poolStore
    }
]