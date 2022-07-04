import { createSlice } from "@reduxjs/toolkit"

const initialNotification = "I'm initial notification"

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotification,
  reducers: {
    createNotification(state, action) {
      return action.payload
    }
  }
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer