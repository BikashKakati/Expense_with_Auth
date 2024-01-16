import { createSlice } from "@reduxjs/toolkit";
import { deletExpenseData, getExpenseData, setExpenseData } from "../api/expenseThunk";

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        loading: false,
        expenses: [],
        totalExpense: 0,
    },

    reducers: {
        updateTotalExpense(state) {
            state.totalExpense = state.expenses.reduce((iniValue, expense) => iniValue + Number(expense.amount), 0);
        }
    },
    extraReducers(builder) {
        builder.addCase(setExpenseData.pending, (state, action) => {
            state.loading = true;
        }).addCase(setExpenseData.fulfilled, (state, action) => {
            const exitExpenseIdx = state.expenses.findIndex(expense => expense.id === action.payload.id);
            if (exitExpenseIdx >= 0) {
                state.expenses[exitExpenseIdx] = action.payload;
                state.loading = false;
                return;
            }
            state.expenses = [...state.expenses, action.payload];
            state.loading = false;
        }).addCase(setExpenseData.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getExpenseData.pending, (state, action) => {
            state.loading = true;
        }).addCase(getExpenseData.fulfilled, (state, action) => {
            state.expenses = action.payload;
            state.totalExpense = state.expenses.reduce((iniValue, expense) => iniValue + Number(expense.amount), 0);
            state.loading = false;
        }).addCase(getExpenseData.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(deletExpenseData.pending, (state, action) => {
            state.loading = true;
        }).addCase(deletExpenseData.fulfilled, (state, action) => {
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
            state.loading = false;
        }).addCase(deletExpenseData.rejected, (state, action) => {
            state.loading = false;
        });
    }
})
export const { updateTotalExpense} = expenseSlice.actions;
export default expenseSlice.reducer;