import { createSlice } from "@reduxjs/toolkit";
import { settingPayload } from "./settingPayload";

const settingSlice = createSlice({
    name: "setting",
    initialState: {
        settings: [],
        setting: null,
        paginateParams: settingPayload.paginateParams,
        total: 0,
    },
    reducers: {
        index: (state, action) => {
            state.settings = action.payload;
            return state;
        },
        update: (state, action) => {
            state.setting = action.payload;
            return state;
        },
        setPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        },
    },
});

export const { index, update, setPaginate } = settingSlice.actions;
export default settingSlice.reducer;
