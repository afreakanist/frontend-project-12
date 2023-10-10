import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannelId: 1,
  channels: [],
};

/* eslint-disable no-param-reassign */
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    switchChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
