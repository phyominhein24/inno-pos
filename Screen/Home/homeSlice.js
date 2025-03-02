import { createSlice } from "@reduxjs/toolkit";
import { homePayload } from "./homePayload";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        homes: [],
        home: null,
        paginateParams: homePayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.homes = action.payload;
            return state;
        },
        update: (state, action) => {
            state.home = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = homeSlice.actions;
export default homeSlice.reducer;
