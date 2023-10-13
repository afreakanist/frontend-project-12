import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

/* eslint-disable no-param-reassign */
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
