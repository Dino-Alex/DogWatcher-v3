import { createReducer } from "@reduxjs/toolkit"
import { fetchDataAdminItems } from "./action"
import { ListDataDog } from "./type"

interface globalDogwatcher {
    listDataDog: ListDataDog[]
}
export const initialState: globalDogwatcher = {
    listDataDog: []
}
export default createReducer(initialState, (builder) =>
builder
.addCase(fetchDataAdminItems, (state, action) => {
    state.listDataDog = action.payload.listDataDog
})
)