import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    status: 'idle',
    error: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.status = 'succeeded';
        },
        loginFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
    }
});

export default authSlice.reducer;
export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout
} = authSlice.actions;