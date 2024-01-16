import { createAsyncThunk } from '@reduxjs/toolkit';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';


export const getStorageData = createAsyncThunk(
    "auth/getStorageData",
    async function (_, { getState }) {
        const state = getState().auth;
        if (!state.currentUser) {
            return;
        }
        try {
            const storageData = await getDoc(doc(db, `currentUser/${state?.currentUser?.uid}/profile/${state?.currentUser?.uid}`));
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
            const docRef = doc(db, `currentUser/${state.currentUser.uid}/profile/${state.currentUser.uid}`)
            await setDoc(docRef, profileDetails);
            return profileDetails;
        } catch (err) {
            throw new Error(err.message);
        }
    }
)
