import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";


export const setExpenseData = createAsyncThunk(
    'expense/setExpenseData',
    async function(expenseData,{getState}){
        const state = getState().auth;
        try{
            const docRef = doc(db,`currentUser/${state.currentUser.uid}/expense`,expenseData.id);
            await setDoc(docRef, expenseData);
            return expenseData;
        }catch(err){
            throw new Error(err.message);
        }
    }
)

export const getExpenseData = createAsyncThunk(
    "expense/getExpenseData",
    async function(_,{getState}){
        const state = getState()?.auth?.currentUser;
        const temp = [];
        try{
            const docRef = collection(db, "currentUser", state.uid, "expense");
            const storageData = await getDocs(docRef);
            storageData?.forEach(doc => {
                temp.push(doc?.data());
            })
            return temp;
        }catch(err){
            throw new Error(err.message);
        }
    }
)

export const deletExpenseData = createAsyncThunk(
    "expense/deletExpenseData",
    async function(expenseId,{getState}){
        const state = getState()?.auth?.currentUser;
        try{
            await deleteDoc(doc(db, `currentUser/${state.uid}/expense`, expenseId));
            return expenseId;
        }catch(err){
            throw new Error(err.message);
        }
    }
)

const expenseSlice = createSlice({
    name:"expense",
    initialState:{
        loading:false,
        expenses:[],
        totalExpense:0,
    },

    reducers:{
        addExpense(state,action){
            const exitExpenseIdx = state.expenses.findIndex(expense => expense.id === action.payload.id);
            if(exitExpenseIdx >= 0){
                state.expenses[exitExpenseIdx] = action.payload;
                return;
            }
            state.expenses = [...state.expenses, action.payload];
        },
        deleteExpense(state, action){
            state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
        },
        updateTotalExpense(state){
            state.totalExpense = state.expenses.reduce((iniValue,expense) => iniValue + Number(expense.amount),0);
        }
    },
    extraReducers(builder){
        builder.addCase(setExpenseData.pending,(state,action)=>{
            state.loading = true;
        }).addCase(setExpenseData.fulfilled,(state,action)=>{
            state.loading = false;
        });

        builder.addCase(getExpenseData.pending,(state,action)=>{
            state.loading = true;
        }).addCase(getExpenseData.fulfilled, (state,action)=>{
            state.expenses = action.payload;
            state.totalExpense = state.expenses.reduce((iniValue,expense) => iniValue + Number(expense.amount),0);
            state.loading = false;
        }).addCase(getExpenseData.rejected, (state,action)=>{
            state.loading = false;
        });

        builder.addCase(deletExpenseData.pending,(state,action)=>{
            state.loading = true;
        }).addCase(deletExpenseData.fulfilled, (state,action)=>{
            state.loading = false;
        }).addCase(deletExpenseData.rejected, (state,action)=>{
            state.loading = false;
        });
    }
})
export const {updateTotalExpense, addExpense, deleteExpense} = expenseSlice.actions;
export default expenseSlice.reducer;