import React from 'react'
import ReactDOM from 'react-dom/client'

import { combineReducers, createStore } from 'redux'
import noteReducers, { setNotes }  from './reducers/noteReducers'
import filterReducer from './reducers/filterReducer'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore, current } from "@reduxjs/toolkit";
import NoteService from './services/NoteService'

// const reducers = combineReducers({
//   notes: noteReducers,
//   filter: filterReducer
// })
// const store = createStore(reducers)

const store = configureStore({
  reducer: {
    notes: noteReducers,
    filter: filterReducer
  }
})

console.log(store.getState())
store.subscribe(()=> {
  console.log(store.getState())
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)