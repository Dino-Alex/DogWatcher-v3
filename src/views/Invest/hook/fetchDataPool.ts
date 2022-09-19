import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import BigNumber from "bignumber.js";
import { ERC20_ABI } from "config/abi/erc20";


export const GetTotalStaked = (tokenStakeAddress, contractAddress, refresh) => {
    const [ tvl, setTvl ] = useState(0)
    useEffect(() => {
        const getTotalStaked = async () => {
            try {
                const calls = [
                    {
                        address: tokenStakeAddress,
                        name: 'balanceOf',
                        params: [contractAddress]
                    },
                ]
                const [ resultTotalStaked ] = await multicall(ERC20_ABI, calls)
                setTvl(Number(new BigNumber(resultTotalStaked.toString()))/1E18)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (contractAddress) {
            getTotalStaked()
        }
      }, [ tokenStakeAddress, contractAddress, refresh ])

    return { tvl }
}