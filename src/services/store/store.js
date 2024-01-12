import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import expenseSlice from "./slices/expenseSlice";

const store = configureStore({
    reducer:{
        auth : authSlice,
        expense: expenseSlice,
    },
})
export default store;