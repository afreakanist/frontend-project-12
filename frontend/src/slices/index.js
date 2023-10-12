import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';
import modalSlice from './modalSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    channels: channelsSlice,
    messages: messagesSlice,
    modal: modalSlice,
  },
});
