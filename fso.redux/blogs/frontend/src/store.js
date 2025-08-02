import { configureStore } from "@reduxjs/toolkit";
import BlogsReducer from "./reducers/BlogsReducer";
import UsersReducer from "./reducers/UsersReducer";
import LoggedInReducer from "./reducers/LoggedInReducer";

const store = configureStore({
    reducer: {
        blogs: BlogsReducer,
        users: UsersReducer,
        loggedin: LoggedInReducer
    }
})

console.log(store.getState())
store.subscribe(()=> {
    console.log(store.getState())
})

export default store