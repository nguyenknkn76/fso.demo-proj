import { createSlice } from "@reduxjs/toolkit"
const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        creatorAddBlog(state, action){
            state.push(action.payload)
        },
        creatorSetBlogs(state, action){
            return action.payload
        },
        
    }
})

export const {creatorAddBlog, creatorSetBlogs} = blogsSlice.actions

export default blogsSlice.reducer