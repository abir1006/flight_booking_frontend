import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import usersSlice from "../features/usersSlice";
import flightSlice from "../features/flightSlice";
import flightQuerySlice from "../features/flightQuerySlice";
import flightBookingSlice from "../features/flightBookingSlice";
import userRouteSlice from "../features/userRouteSlice";
import spinnerSlice from "../features/spinnerSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        users: usersSlice,
        flights: flightSlice,
        flightQuery: flightQuerySlice,
        flightBooking: flightBookingSlice,
        userRoute: userRouteSlice,
        spinnerContainer: spinnerSlice,
    }
});

export default store;