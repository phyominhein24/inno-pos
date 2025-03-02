import { createSlice } from "@reduxjs/toolkit";

const shareSlice = createSlice({
  name: "share",
  initialState: {
    notification: [],
    errors: null,
    showAlert: false,
  },
  reducers: {
    updateNotification: (state, action) => {
      state.notification.push({
        id : Date.now(),
        variant : action.payload.variant,
        message : action.payload.message,
        time : action?.payload?.time ? action?.payload?.time : 'active'
    });
      return state;
    },
    removeNotification: (state, action) => {
      state.notification = state.notification.filter(
        (notification) => notification.id !== action.payload
      );
    },
    updateMessage: (state, action) => {
      state.messages = action.payload;
      return state;
    },
    updateError: (state, action) => {
      state.errors = { ...action.payload };
      return state;
    },
    alertToggle: (state) => {
      state.showAlert = !state.showAlert
      return state
    }
  },
});

export const {
  updateNotification,
  removeNotification,
  updateMessage,
  updateError,
  alertToggle
} = shareSlice.actions;
export default shareSlice.reducer;
