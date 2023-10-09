import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messagesList: [],
};

/* eslint-disable no-param-reassign */
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messagesList.push(action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
