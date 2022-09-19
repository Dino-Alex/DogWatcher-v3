import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import BigNumber from "bignumber.js";
import poolStoreAbi from "config/abi/poolStore.json"
import poolProposalAbi from "config/abi/poolProposals.json"
import { useWeb3React } from "@web3-react/core";
import { ERC20_ABI } from "config/abi/erc20";

export const GetTotalProfitAmount = (contractAddress, refresh) => {
    const [ totalProfitAmount, setTotalProfitAmount ] = useState(0)
    useEffect(() => {
        const getTotalProfitAmount = async () => {
            try {
                const calls = [
                    {
                        address: contractAddress,
                        name: 'totalProfitAmount',
                        params: []
                    },
                ]
                const [ resultTotalStaked ] = await multicall(poolStoreAbi, calls)
                setTotalProfitAmount(Number(new BigNumber(resultTotalStaked.toString()))/1E18)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (contractAddress) {
            getTotalProfitAmount()
        }
      }, [ contractAddress, refresh ])

    return { totalProfitAmount }
}

export const GetPendingReward = (contractAddress, refresh,callback) => {
    const [ pendingReward, setPendingReward ] = useState(0)
    const { account } = useWeb3React()
    useEffect(() => {
        const getTotalProfitAmount = async () => {
            try {
                const calls = [
                    {
                        address: contractAddress,
                        name: 'pendingReward',
                        params: [account]
                    },
                ]
                const [ resultPenddingReward ] = await multicall(poolStoreAbi, calls)
                setPendingReward(Number(new BigNumber(resultPenddingReward.toString()))/1E18)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account) {
            getTotalProfitAmount()
        }
      }, [ contractAddress, refresh, account,callback ])

    return { pendingReward }
}

export const GetPendingRewardProposal = (contractAddress,callback) =>{
    const [pendingProposal,setpendingProposal] = useState(0);
    const {account} = useWeb3React();
    useEffect(() => {
        const getTotalProposal = async () => {
            try {
                const calls = [
                    {
                        address: contractAddress,
                        name: 'pendingReward',
                        params: [account]
                    },
                ]
                const [ resultPenddingReward ] = await multicall(poolProposalAbi, calls);
                setpendingProposal(Number((resultPenddingReward.toString()))/1E18)
            }
            catch(error) {
                console.log(error)
            }
        }
        if (account && contractAddress) {
            getTotalProposal()
        }
      }, [ contractAddress,account,callback ])
      return {pendingProposal}
}

