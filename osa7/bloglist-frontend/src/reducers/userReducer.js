import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { showError } from "./notificationReducer"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const login = (username, password) => {
  return async (dispatch, getState) => {
    try {
      console.log(`initial user state is ${getState().user}`)
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      console.log(`user set to ${JSON.stringify(getState().user)}`)
    } catch (error) {
      dispatch(showError("wrong username or password", 5))
    }
  }
}

export default userSlice.reducer
