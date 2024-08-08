import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    travellers: 1
};
const flightQuerySlice = createSlice({
    name: "flightQuery",
    initialState,
    reducers: {
        setQuery: (state, action) => {
            const key = Object.keys(action.payload)[0];
            const value = Object.values(action.payload)[0];
            state[key] = value;
        },
        resetQuery: (state, action) => {
            return action.payload
        }
    }
});

export default flightQuerySlice.reducer;
export const {
    setQuery,
    resetQuery
} = flightQuerySlice.actions;