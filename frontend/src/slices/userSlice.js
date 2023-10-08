import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  username: null,
};

/* eslint-disable no-param-reassign */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    setCurrentUser: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export const { logIn, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
