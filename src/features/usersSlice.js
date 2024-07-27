import {createSlice} from "@reduxjs/toolkit";

const initialState = [];
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            return action.payload;
        },
        deleteUser: (state, action) => {
            return state.filter(item => item.id != action.payload);
        }
    }
});

export default usersSlice.reducer;
export const {
    setUsers,
    deleteUser
} = usersSlice.actions;