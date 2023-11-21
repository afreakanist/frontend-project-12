import { createContext } from 'react';
import { io } from 'socket.io-client';

import store from '../slices/index';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';

export const ChatCtx = createContext();

const socket = io();
const { dispatch } = store;

// subscribe
socket.on('newMessage', (payload) => {
  dispatch(messagesActions.addMessage(payload));
});

socket.on('newChannel', (payload) => {
  dispatch(channelsActions.addChannel(payload));
});

socket.on('renameChannel', (payload) => {
  dispatch(channelsActions.renameChannel(payload));
});

socket.on('removeChannel', (payload) => {
  dispatch(channelsActions.removeChannel(payload));
});

// emit
const chatApi = {
  sendMessage(message) {
    return new Promise((resolve, reject) => {
      socket.emit('newMessage', message, (response) => {
        if (response.status === 'ok') {
          return resolve();
        }
        return reject();
      });
    });
  },
  handleChannel({ action, ...channel }) {
    return new Promise((resolve, reject) => {
      socket.emit(`${action}Channel`, channel, (response) => {
        if (response.status === 'ok') {
          if (response.data) {
            dispatch(channelsActions.switchChannel(response.data.id));
          }
          return resolve();
        }
        return reject();
      });
    });
  },
};

export const ApiProvider = ({ children }) => (
  <ChatCtx.Provider value={chatApi}>
    {children}
  </ChatCtx.Provider>
);
