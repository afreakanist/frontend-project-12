import { io } from 'socket.io-client';

import store from '../slices/index';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';

const socket = io();
const { dispatch } = store;

// subscribe
socket.on('newMessage', (payload) => {
  dispatch(messagesActions.addMessage(payload));
});

socket.on('newChannel', (payload) => {
  dispatch(channelsActions.addChannel(payload));
});

socket.on('removeChannel', (payload) => {
  dispatch(channelsActions.removeChannel(payload));
});

// emit
export const sendMessage = (message) => new Promise((resolve, reject) => {
  socket.emit('newMessage', message, (response) => {
    if (response.status === 'ok') {
      return resolve();
    }
    return reject();
  });
});

export const addChannel = (channel) => new Promise((resolve, reject) => {
  socket.emit('newChannel', channel, (response) => {
    if (response.status === 'ok') {
      return resolve();
    }
    return reject();
  });
});

export const removeChannel = (channel) => new Promise((resolve, reject) => {
  socket.emit('removeChannel', channel, (response) => {
    if (response.status === 'ok') {
      return resolve();
    }
    return reject();
  });
});
