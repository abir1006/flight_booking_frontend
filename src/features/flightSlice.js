import {createSlice} from "@reduxjs/toolkit";

const initialState = [];
const flightSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        setFlights: (state, action) => {
            return action.payload;
        }
    }
});

export default flightSlice.reducer;
export const {
    setFlights
} = flightSlice.actions;