import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import blogReducer from "./reducers/blogReducer"
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import notificationReducer from "./reducers/notificationReducer"
import usersReducer from "./reducers/usersReducer"
import { BrowserRouter as Router } from "react-router-dom"
import styled from "styled-components"

const StyledApp = styled(App)`
  margin: auto;
  width: 100%;
`

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <StyledApp />
    </Router>
  </Provider>
)
