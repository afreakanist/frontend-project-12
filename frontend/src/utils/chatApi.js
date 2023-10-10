import { io } from 'socket.io-client';

import store from '../slices/index';
import { actions as messagesActions } from '../slices/messagesSlice';

const socket = io();
const { dispatch } = store;

// subscribe
socket.on('newMessage', (payload) => {
  dispatch(messagesActions.addMessage(payload));
});

// emit
/* eslint-disable import/prefer-default-export */
export const sendMessage = (message) => new Promise((resolve, reject) => {
  socket.emit('newMessage', message, (response) => {
    if (response.status === 'ok') {
      return resolve();
    }
    return reject();
  });
});
