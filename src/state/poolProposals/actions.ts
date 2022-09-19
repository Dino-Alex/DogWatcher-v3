import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userStaked, MinAmoutToVoting } from './type'

export const fetchDataPool = createAction<userStaked>('poolProposals/fetchDataPool')
export const fetchMinAmountToVoting = createAction<MinAmoutToVoting>('poolProposals/fetchMinAmountToVoting')
