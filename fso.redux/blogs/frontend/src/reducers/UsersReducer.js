import { createSlice } from "@reduxjs/toolkit";

const init = [
    { id: 1, name: 'John Doe', username: 'john_doe', password: 'securePassword1' },
    { id: 2, name: 'Jane Smith', username: 'jane_smith', password: 'strongPassword2' },
    { id: 3, name: 'Khoi Nguyen', username: 'nguyen', password: '123456' },
    { id: 4, name: 'Long', username: 'long', password: '123456' },
]

const usersSlice = createSlice({
    name:"users",
    initialState: init,
    reducers: {
        creatorAddUser(state, action){
            state.push(action.payload)
        },
        creatorSetUsers(state, action){
            return action.payload
        },
        creatorGetUsers(state, action){
            return state
        }
    }
})

export const {creatorSetUsers, creatorAddUser, creatorGetUsers} = usersSlice.actions

export default usersSlice.reducer