import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/store'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
