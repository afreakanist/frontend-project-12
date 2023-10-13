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
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    renameChannel: (state, action) => {
      const targetIdx = state.channels.findIndex((c) => c.id === action.payload.id);
      state.channels.splice(targetIdx, 1, action.payload);
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((c) => c.id === action.payload.id);
    },
    switchChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
