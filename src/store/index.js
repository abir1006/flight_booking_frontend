import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import usersSlice from "../features/usersSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        users: usersSlice,
    }
});

export default store;