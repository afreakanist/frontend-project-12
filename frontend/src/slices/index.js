import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import channelsSlice from './channelsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    channels: channelsSlice,
  },
});
