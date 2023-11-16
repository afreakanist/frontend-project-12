import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../utils/api';

export const getChatData = createAsyncThunk(
  'channels/getChatData',
  async (headers, { rejectWithValue }) => {
    try {
      const payload = await getData(headers);
      return payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
    renameChannel: (state, action) => {
      const targetIdx = state.channels.findIndex((c) => c.id === action.payload.id);
      state.channels.splice(targetIdx, 1, action.payload);
    },
    removeChannel: (state, action) => {
      const removedChannelId = action.payload.id;
      state.channels = state.channels.filter((c) => c.id !== removedChannelId);
      if (state.currentChannelId === removedChannelId) {
        state.currentChannelId = initialState.currentChannelId;
      }
    },
    switchChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
    });
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
