import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {createStore} from 'redux'

import App from './App.jsx'
import anecdoteReducer from './reducers/anecdoteReducer.js'
// import './index.css'

const store = createStore(anecdoteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
      <App/>
  </Provider>
)
