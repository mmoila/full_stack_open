import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    content: null,
    error: false,
  },
  reducers: {
    setNotification(state, action) {
      return { content: action.payload, error: false }
    },
    setError(state, action) {
      return { content: action.payload, error: true }
    },
  },
})

export const { setNotification, setError } = notificationSlice.actions

export const showNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, time * 1000)
  }
}

export const showError = (message, time) => {
  return (dispatch) => {
    dispatch(setError(message))
    setTimeout(() => {
      dispatch(setError(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
