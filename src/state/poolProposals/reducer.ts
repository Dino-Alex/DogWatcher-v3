import { createReducer } from '@reduxjs/toolkit'
import { fetchDataPool, fetchMinAmountToVoting } from "./actions"
import { userStakedProps } from "./type"

interface globalPoolRun {
    userStaked: userStakedProps[],
    minAmountToVote:number
}
export const initialState: globalPoolRun = {
    userStaked:[
        {
            amount:0,
            stakeBlock:0,
            unstakeLockTime:0,
            pendingReward:0,
            endTime:0,
            startTime:0
        },
    ],
    minAmountToVote:0
}
export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchDataPool, (state, action) => {
      state.userStaked = action.payload.userStaked
    })
    .addCase(fetchMinAmountToVoting, (state, action) => {
        state.minAmountToVote = action.payload.minAmountToVote
    })
)