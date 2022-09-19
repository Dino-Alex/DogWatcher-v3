import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ListShoes, ListBoxes } from './type'

export const fetchShoes = createAction<ListShoes>('inventory/fetchShoes')
export const fetchBoxes = createAction<ListBoxes>('inventory/fetchBoxes')