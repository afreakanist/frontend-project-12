import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  channelsList: [],
};

/* eslint-disable no-param-reassign */
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state.channelsList.push(action.payload);
    },
    switchChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { addChannel, switchChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
