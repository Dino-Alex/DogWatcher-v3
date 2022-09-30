import { createAction } from '@reduxjs/toolkit'
import { MinAmoutToVoting, userStaked } from './type'

export const fetchDataPool = createAction<userStaked>('poolProposals/fetchDataPool')
export const fetchMinAmountToVoting = createAction<MinAmoutToVoting>('poolProposals/fetchMinAmountToVoting')
