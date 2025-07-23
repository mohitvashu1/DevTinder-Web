import { createSlice } from "@reduxjs/toolkit";


const userSlie = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: () => {
            return null;
        }
    }
})

export const { addUser, removeUser } = userSlie.actions;
export default userSlie.reducer;