import { createContext } from 'react';

export const ChatCtx = createContext();

export const ApiProvider = ({ children, value }) => (
  <ChatCtx.Provider value={value}>
    {children}
  </ChatCtx.Provider>
);
