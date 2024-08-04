import {createSlice} from "@reduxjs/toolkit";

const initialState = {};
const flightQuerySlice = createSlice({
    name: "flightQuery",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            const key = Object.keys(action.payload)[0];
            const value = Object.values(action.payload)[0];
            state[key] = value;
        }
    }
});

export default flightQuerySlice.reducer;
export const {
    setQuery
} = flightQuerySlice.actions;