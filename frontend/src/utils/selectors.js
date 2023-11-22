import { createSelector } from '@reduxjs/toolkit';

export default (currentChannelId) => createSelector(
  (state) => state.messages.messages,
  (messages) => messages.filter((message) => message.channelId === currentChannelId),
);
