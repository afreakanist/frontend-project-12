import { useState } from 'react';
import { useSelector } from 'react-redux';

import { sendMessage } from '../utils/chatApi';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const { currentChannelId } = useSelector((state) => state.channels);
  const { username } = useSelector((state) => state.user);

  const handleMessageSending = (event) => {
    event.preventDefault();

    const newMessage = {
      body: message,
      channelId: currentChannelId,
      username,
    };

    sendMessage(newMessage)
      .then(() => {
        setMessage('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <form
      className="form message-box"
      noValidate
      autoComplete="off"
      onSubmit={(event) => handleMessageSending(event)}
    >
      <div className="input-group  py-1 border rounded-2">
        <input
          id="message"
          name="message"
          placeholder="Write something here ..."
          aria-label="Message"
          className="form-control border-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-group-vertical"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
          <span className="visually-hidden">Send</span>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
