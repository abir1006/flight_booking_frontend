import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    show: false
};
const spinnerSlice = createSlice({
    name: "spinnerContainer",
    initialState,
    reducers: {
        setSpinnerContainer: (state, action) => {
            return action.payload;
        }
    }
});

export default spinnerSlice.reducer;
export const {
    setSpinnerContainer
} = spinnerSlice.actions;