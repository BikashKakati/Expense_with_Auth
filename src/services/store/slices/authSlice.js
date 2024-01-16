import { createSlice } from "@reduxjs/toolkit";
import { getStorageData, setStorageData } from "../api/authThunk";
const LOCAL_STORAGE_KEY = "CURRENT_USER";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        popUpAlert: { show: false, msg: "" },
        currentUser: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || null,
        userDetails: null,
        toggleTheme: false,
    },

    reducers: {
        login(state, action) {
            state.currentUser = action.payload;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
        },
        logout(state) {
            state.currentUser = null;
            localStorage.setItem(LOCAL_STORAGE_KEY, null);
        },
        alertHandler(state, action) {
            state.popUpAlert = action.payload;
        },
        loadingHandler(state, action) {
            state.isLoading = action.payload;
        },
        toggleThemeHandler(state) {
            state.toggleTheme = !state.toggleTheme;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getStorageData.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getStorageData.fulfilled, (state, action) => {
            state.userDetails = action.payload;
            state.isLoading = false;
        }).addCase(getStorageData.rejected, (state, action) => {
            state.isLoading = false;
            state.popUpAlert = { show: true, msg: action.payload };
        });

        builder.addCase(setStorageData.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(setStorageData.fulfilled, (state, action) => {
            state.userDetails = action.payload;
            state.isLoading = false;
        }).addCase(setStorageData.rejected, (state, action) => {
            state.isLoading = false;
            state.popUpAlert = { show: true, msg: action.payload };
        });
    },
});


export const { login, logout, alertHandler, loadingHandler, toggleThemeHandler} = authSlice.actions;
export default authSlice.reducer;