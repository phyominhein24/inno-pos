import { configureStore } from "@reduxjs/toolkit";
import shareSlice from "./shareSlice";
import userSlice from "../Screen/User/userSlice";
import categorySlice from "../Screen/Category/categorySlice";
import itemSlice from "../Screen/Item/itemSlice";
import invoiceSlice from "../Screen/Invoice/invoiceSlice";

export const stores = configureStore({
    reducer: {
        share: shareSlice,
        user: userSlice,
        category: categorySlice,
        item: itemSlice,
        invoice: invoiceSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
