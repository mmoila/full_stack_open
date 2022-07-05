import { createSlice } from "@reduxjs/toolkit"

const initialNotification = {message: "I'm initial notification", visible: false}

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotification,
  reducers: {
    createNotification(state, action) {
      return {
        message: action.payload,
        visible: true
      }
    },
    hideNotification(state, action) {
      return {
        ...state,
        visible: false
      }
    }
  }
})

export const { createNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer