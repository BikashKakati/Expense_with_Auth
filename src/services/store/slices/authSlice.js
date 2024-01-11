import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
const LOCAL_STORAGE_KEY = "CURRENT_USER";

export const getStorageData = createAsyncThunk(
    "auth/getStorageData",
    async function (_, { getState }) {
        const state = getState().auth;
        if(!state.currentUser){
            return;
        }
        try {
            const storageData = await getDoc(doc(db, "currentUser", state?.currentUser?.uid));
            return storageData?.data();
        } catch (err) {
            throw new Error(err.message);
        }
    }
)
export const setStorageData = createAsyncThunk(
    "auth/setStorageData",
    async function (profileDetails, { getState }) {
        const state = getState().auth;
        try {
            await setDoc(doc(db, "currentUser", state.currentUser.uid), profileDetails);
            return profileDetails;
        } catch (err) {
            throw new Error(err.message);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading:false,
        popUpAlert:{show:false,msg:""},
        currentUser: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || null,
        userDetails: null,
    },

    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.setItem(LOCAL_STORAGE_KEY, null);
        },
        alertHandler(state,action){
            state.popUpAlert = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStorageData.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getStorageData.fulfilled, (state, action) => {
            state.userDetails = action.payload;
            state.isLoading = false;
        }).addCase(getStorageData.rejected, (state,action) =>{
            state.isLoading = false;
            state.popUpAlert = {show:true, msg:action.payload};
        });

        builder.addCase(setStorageData.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(setStorageData.fulfilled, (state, action) => {
            state.userDetails = action.payload;
        }).addCase(setStorageData.rejected, (state,action) =>{
            state.isLoading = false;
            state.popUpAlert = {show:true, msg:action.payload};
        });
    },
});

export const { login, logout, alertHandler } = authSlice.actions;
export default authSlice.reducer;