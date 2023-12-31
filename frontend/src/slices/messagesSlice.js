import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions, getChatData } from './channelsSlice';

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
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        const channelId = action.payload.id;
        state.messages = state.messages.filter((m) => m.channelId !== channelId);
      })
      .addCase(getChatData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      });
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
