import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

export const useGetBlockNumber = () => {
    const { ethereum } = window
    const [ block, setBlockNumber ] = useState(0)
    const provider = new ethers.providers.Web3Provider(ethereum)
    useEffect(() => {
        const getBlockNumber = async () =>{
        try {
            const blockNumber = await provider.getBlockNumber()
            setBlockNumber(blockNumber)
        } catch (error) {
            console.error(error);
        }
    }
        getBlockNumber()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return { block }
}