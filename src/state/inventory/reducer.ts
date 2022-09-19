
import { createReducer } from '@reduxjs/toolkit'
import { runType } from './type'
import { fetchShoes, fetchBoxes } from "./actions"

interface globalStateInventory {
    listShoes: runType[],
    listBoxes:runType[],
}

export const initialState: globalStateInventory = {
    listShoes: [],
    listBoxes:[]
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchShoes, (state, action) => {
      state.listShoes = action.payload.listShoes
    })
    .addCase(fetchBoxes, (state, action) => {
        state.listBoxes = action.payload.listBoxes
      })
)