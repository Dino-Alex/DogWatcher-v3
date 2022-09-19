import React, { useState, useEffect } from "react";
import multicall from "utils/multicall";
import { URL } from "config/index"
import BigNumber from "bignumber.js";
import { getAddress } from "utils/addressHelpers";
import tokens from "config/constants/tokens";
import contracts from "config/constants/contracts";
import poolProposalsAbi from "config/abi/poolProposals.json"
import { userStaked, MinAmoutToVoting } from "./type";

export const fetchData = async (account:string, poolProposals:any): Promise<userStaked> => {
    if ( account ) {
        try {
            const callsUserInfo = poolProposals.map((item) => {
                return {
                    address: getAddress(item.storeContract),
                    name: 'userInfo',
                    params: [account]
                }
            })
            const callsPenddingReward = poolProposals.map((item) => {
                return {
                    address: getAddress(item.storeContract),
                    name: 'pendingReward',
                    params: [account]
                }
            })
            const callsStartTime = poolProposals.map((item) => {
                return {
                    address: getAddress(item.storeContract),
                    name: 'startTime',
                    params: []
                }
            })
            const callsEndTime = poolProposals.map((item) => {
                return {
                    address: getAddress(item.storeContract),
                    name: 'endTime',
                    params: []
                }
            })
            const resultUserInfo = await multicall(poolProposalsAbi, callsUserInfo)
            const resultPenddingReward = await multicall(poolProposalsAbi, callsPenddingReward)
            const resultStartTime = await multicall(poolProposalsAbi, callsStartTime)
            const resultEndTime = await multicall(poolProposalsAbi, callsEndTime)
            const result = resultPenddingReward.map((item, key) => {
                return { 
                    amount: Number(new BigNumber(resultUserInfo[key]?.amount.toString()))/1E18,
                    stakeBlock:Number(new BigNumber(resultUserInfo[key]?.stakeBlock.toString())),
                    unstakeLockTime:Number(resultUserInfo[key]?.unstakeLockTime.toString()),
                    pendingReward:Number(new BigNumber(resultPenddingReward[key].toString()))/1E18,
                    endTime:Number(resultEndTime[key]?.toString()),
                    startTime:Number(resultStartTime[key]?.toString())
                }
            })
            return {
                userStaked : result
            }
        }
        catch(error) {
            console.log(error)
            return {
                userStaked : [
                    {
                        amount:0,
                        stakeBlock:0,
                        unstakeLockTime:0,
                        pendingReward:0,
                        endTime:0,
                        startTime:0
                    }
                ]
            }
           
        }
    } else {
        return {
            userStaked : [
                {
                    amount:0,
                    stakeBlock:0,
                    unstakeLockTime:0,
                    pendingReward:0,
                    endTime:0,
                    startTime:0
                }
            ]
        }
    }
    
}

export const fetchMinToVote = async (): Promise<MinAmoutToVoting> => {
    try {
        const calls = [
            {
                address: getAddress(contracts.votingProposals),
                name: 'minAmountToVote',
                params: []
            }
        ]
        const [ resultMinAmount ] = await multicall(poolProposalsAbi, calls)
        return {
            minAmountToVote:Number((resultMinAmount?.toString()))/1E18
        }
    }
    catch(error) {
        console.log(error)
        return {
            minAmountToVote:0
        }
       
    }
    
}