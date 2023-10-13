import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: {
    show: false,
    data: null,
    action: null,
  },
};

/* eslint-disable no-param-reassign */
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.modal = { ...payload, show: true };
    },
    closeModal: (state) => {
      state.modal.show = false;
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
