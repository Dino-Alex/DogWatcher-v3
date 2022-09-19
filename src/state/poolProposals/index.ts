import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { fetchData, fetchMinToVote } from "./fetchDataUser"
import { fetchDataPool, fetchMinAmountToVoting } from "./actions"

export const GetPoolProposals = (account:string, poolProposals) => {
    const data = useSelector<AppState, AppState['poolProposals']>((state) => state.poolProposals)
    const dataUserStaked = data.userStaked
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchData(account, poolProposals)
                dispatch(fetchDataPool(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser()
    }, [ dispatch, account, poolProposals ]) 
    return [ dataUserStaked ]
}

export const GetAmountMintToVote = () => {
    const data = useSelector<AppState, AppState['poolProposals']>((state) => state.poolProposals)
    const minAmountToVote = data.minAmountToVote
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        const getDataUser = async () => {
            try {
                const result = await fetchMinToVote()
                dispatch(fetchMinAmountToVoting(result))
            } catch (e) {
                console.log(e)
            }
        }
        getDataUser()
    }, [ dispatch ]) 
    return [ minAmountToVote ]
}