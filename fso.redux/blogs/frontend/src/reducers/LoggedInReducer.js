import { createSlice } from "@reduxjs/toolkit";

const loggedInSlice = createSlice({
    name: "loggedin",
    initialState: null,
    reducers:{
        creatorSetLoggedIn(state,action){
            return action.payload
        }
    }
})

export const {creatorSetLoggedIn} = loggedInSlice.actions

export default loggedInSlice.reducer