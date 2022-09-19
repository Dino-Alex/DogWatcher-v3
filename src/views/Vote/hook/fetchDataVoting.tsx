import React, { useState, useEffect } from "react";
import erc20ABI from 'config/abi/erc20.json'
import { useWeb3React } from '@web3-react/core'
import votingProposalsAbi from "config/abi/votingProposals.json"
import BigNumber from "bignumber.js";
import { getAddress } from "utils/addressHelpers";
import multicall from "utils/multicall";
import contracts from "config/constants/contracts";

export const FetchDataVoting = (votingId, refresh=0) => {
    const [ dataVoting, setDataVoting ] = useState({
        agree:0,
        refuse:0,
        totalVote:0,
        startDate:0,
        endDate:0,
        chairPerson:""
    })
    useEffect(() => {
      const fetcDataVoting = async () => {
        try {
             const calls = [
                {
                  address: getAddress(contracts.votingProposals),
                  name: 'voteCounter',
                  params: [votingId, true]
                },
                {
                    address: getAddress(contracts.votingProposals),
                    name: 'voteCounter',
                    params: [votingId, false]
                },
                {
                  address: getAddress(contracts.votingProposals),
                  name: 'proposals',
                  params: [votingId]
              },
             ]
            const [ votingAgree, votingRefuse, resultProposals ] = await multicall(votingProposalsAbi, calls)
            setDataVoting({
                agree:Number(new BigNumber(votingAgree).toString())/1E18,
                refuse:Number(new BigNumber(votingRefuse).toString())/1E18,
                totalVote:Number(new BigNumber(votingAgree).toString())/1E18+Number(new BigNumber(votingRefuse).toString())/1E18,
                startDate:Number((resultProposals?.startTime).toString()),
                endDate:Number((resultProposals?.endTime).toString()),
                chairPerson:resultProposals?.chairPerson
            })
        } catch (e) {
          console.log(e)
        }
      }
      if (votingId) {
        fetcDataVoting()
      }
    }, [refresh, votingId])
  
    return { dataVoting }
}

export const FetchTotalVotingByUser = (votingId, requestedUnStake, refresh) => {
  const [ totalVoting, setTotalVoting ] = useState(0)
  const { account } = useWeb3React()
  useEffect(() => {
    const fetcTotalVoting = async () => {
      try {
           const calls = [
              {
                address: getAddress(contracts.votingProposals),
                name: 'voters',
                params: [votingId, account]
              },
           ]
          const [ resultTotalVoting ] = await multicall(votingProposalsAbi, calls)
          setTotalVoting(Number(resultTotalVoting?.stakingAmount.toString())/1E18)
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetcTotalVoting()
    }
  }, [requestedUnStake, votingId, account, refresh])

  return { totalVoting }
}

export const FetchUserUnStake = (votingId, requestedUnStake) => {
  const [ isUnStaked, setIsUnStaked ] = useState(false)
  const { account } = useWeb3React()
  useEffect(() => {
    const fetchUserUnStaked = async () => {
      try {
           const calls = [
              {
                address: getAddress(contracts.votingProposals),
                name: 'isUnstaked',
                params: [votingId, account]
              },
           ]
          const [ resultIsUnStaked ] = await multicall(votingProposalsAbi, calls)
          setIsUnStaked(resultIsUnStaked?.stakingAmount)
      } catch (e) {
        console.log(e)
      }
    }
    if (account) {
      fetchUserUnStaked()
    }
  }, [requestedUnStake, votingId, account])

  return { isUnStaked }
}