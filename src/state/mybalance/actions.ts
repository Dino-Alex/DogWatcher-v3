import { createAction } from '@reduxjs/toolkit'
import { listBanlace, ListTransaction } from './type'

export const fetchAllTransactions = createAction<ListTransaction>('mybalance/fetchAllTransactions')
export const fetchBalance = createAction<listBanlace>('mybalance/fetchBalance')