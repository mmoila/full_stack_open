import { createSlice } from "@reduxjs/toolkit"

const initialFilter = ""

const filterSlice = createSlice({
    name: "filter",
    initialState: initialFilter,
    reducers: {
        addFilter(state, action) {
            return action.payload
        },
        resetFilter(state, action) {
            return ""
        }
    }
})

export const { addFilter, resetFilter } = filterSlice.actions
export default filterSlice.reducer