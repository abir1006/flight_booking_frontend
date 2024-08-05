import {createSlice} from "@reduxjs/toolkit";

const initialState = {};
const flightBookingSlice = createSlice({
    name: "flightBooking",
    initialState,
    reducers: {
        setFlightBooking: (state, action) => {
            return action.payload;
        }
    }
});

export default flightBookingSlice.reducer;
export const {
    setFlightBooking
} = flightBookingSlice.actions;