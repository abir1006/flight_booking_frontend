import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    productLoading: false
};
const spinnerSlice = createSlice({
    name: "spinner",
    initialState,
    reducers: {
        productLoadingSpinner: (state, action) => {
            state.productLoading = action.payload;
        }
    }
});

export default spinnerSlice.reducer;
export const {
    productLoadingSpinner
} = spinnerSlice.actions;