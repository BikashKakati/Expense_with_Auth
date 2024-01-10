import { createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useEffect } from 'react';
const LOCAL_STORAGE_KEY = "CURRENT_USER";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || null,
        userDetails: {},
    },

    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(action.payload));
        },
        updateProfile(state, action){
            state.userDetails = action.payload;
        }
    },
});

export const { login, updateProfile} = authSlice.actions;
export default authSlice.reducer;