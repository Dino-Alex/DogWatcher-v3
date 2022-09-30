import { createAction } from '@reduxjs/toolkit'
import { ListBoxes, ListShoes } from './type'

export const fetchShoes = createAction<ListShoes>('inventory/fetchShoes')
export const fetchBoxes = createAction<ListBoxes>('inventory/fetchBoxes')