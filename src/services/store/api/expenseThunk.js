import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";


export const setExpenseData = createAsyncThunk(
    'expense/setExpenseData',
    async function (expenseData, { getState }) {
        const state = getState().auth;
        try {
            const docRef = doc(db,
                `currentUser/${state.currentUser?.uid}/expense/${expenseData.id}`);
            await setDoc(docRef, expenseData);
            return expenseData;
        } catch (err) {
            throw new Error(err.message);
        }
    }
)

export const getExpenseData = createAsyncThunk(
    "expense/getExpenseData",
    async function (_, { getState }) {
        const state = getState()?.auth?.currentUser;
        const temp = [];
        try {
            const docRef = collection(db, `currentUser/${state?.uid}/expense`);
            const storageData = await getDocs(docRef);
            storageData?.forEach(doc => {
                temp.push(doc?.data());
            })
            return temp;
        } catch (err) {
            throw new Error(err.message);
        }
    }
)

export const deletExpenseData = createAsyncThunk(
    "expense/deletExpenseData",
    async function (expenseId, { getState }) {
        const state = getState()?.auth?.currentUser;
        try {
            await deleteDoc(doc(db, `currentUser/${state.uid}/expense/${expenseId}`));
            return expenseId;
        } catch (err) {
            throw new Error(err.message);
        }
    }
)