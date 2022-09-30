import { createAction } from '@reduxjs/toolkit'
import { ListSellItemsProps, NftInfoProps, SellListProps, TokenIdsProps, TotalSellProps } from "./type"

export const fetchBalance = createAction<{ balance: number }>('marketplace/fetchBalance')
export const fetchTokenIds = createAction<TokenIdsProps>('marketplace/fetchTokenIds')
export const fetchTokenInfo = createAction<NftInfoProps>('marketplace/fetchTokenInfo')
export const fetchTotalSellItem = createAction<TotalSellProps>('marketplace/fetchTotalSellItem')
export const fetchSellItemsByUser = createAction<SellListProps>('marketplace/fetchSellItemsByUser')
export const fetchSellItems = createAction<ListSellItemsProps>('marketplace/fetchSellItems')