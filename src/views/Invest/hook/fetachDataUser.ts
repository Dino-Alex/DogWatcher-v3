import React, { useState, useEffect } from "react";
import { getAddress } from "utils/addressHelpers";
import RunTogetherBox from "config/abi/RunTogetherBox.json"
import multicall from "utils/multicall";
import BigNumber from "bignumber.js";
import tokens from "config/constants/tokens";
import { useWeb3React } from "@web3-react/core";
import { parseInt } from "lodash";
import useRefresh from 'hooks/useRefresh'
import contracts from "config/constants/contracts";
import erc20ABI from 'config/abi/erc20.json'
import axios from 'axios'

export const GetDataUser = (tokenStakeAddress, contractPoolAddress, requestedApproval) => {
    const { account } = useWeb3React()
    const [ dataUser, setDataUser ] = useState({
        balance:0,
        allowance:0
    })
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const calls = [
                    {
                        address: tokenStakeAddress,
                        name: 'balanceOf',
                        params: [account]
                    },
                    {
                        address: tokenStakeAddress,
                        name: 'allowance',
                        params: [account, contractPoolAddress]
                    }
                ]
                const [resultBalance, resultAllowance ] = await multicall(erc20ABI, calls)
                setDataUser({
                    balance:Number(new BigNumber(resultBalance.toString()))/1E18,
                    allowance:Number(new BigNumber(resultAllowance).toJSON())
                })
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account) {
            getDataUser()
        }
      }, [account, tokenStakeAddress, contractPoolAddress, requestedApproval])

    return { dataUser }
}