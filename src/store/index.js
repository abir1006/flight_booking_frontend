import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import usersSlice from "../features/usersSlice";
import flightSlice from "../features/flightSlice";
import flightQuerySlice from "../features/flightQuerySlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        users: usersSlice,
        flights: flightSlice,
        flightQuery: flightQuerySlice
    }
});

export default store;