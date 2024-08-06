import {createSlice} from "@reduxjs/toolkit";

const initialState = [];
const usersRouteSlice = createSlice({
    name: "userRoute",
    initialState,
    reducers: {
        setPrevRoute: (state, action) => {
            return action.payload;
        }
    }
});

export default usersRouteSlice.reducer;
export const {
    setPrevRoute,
} = usersRouteSlice.actions;