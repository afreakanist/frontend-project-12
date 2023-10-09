import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { switchChannel } from '../slices/channelsSlice';
import { addMessage } from '../slices/messagesSlice';

const Main = () => {
  const { currentChannelId, channelsList } = useSelector((state) => state.channels);
  const { messagesList } = useSelector((state) => state.messages);
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState('');

  const handleChannelSwitch = (event, id) => {
    event.preventDefault();
    dispatch(switchChannel(id));
  };

  const handleMessageSending = (event) => {
    event.preventDefault();

    dispatch(addMessage({
      id: messageText[0],
      channelId: currentChannelId,
      text: messageText,
      author: username,
      created: (new Date()).toISOString(), // ?
    }));
    setMessageText('');
  };

  return (
    <>
      <div className="sidebar">
        <h2 className="sidebar__section-name">Channels</h2>
        <ul className="list-group">
          {channelsList?.map((channel) => (
            <li
              className={
                `list-group-item ${channel.id === currentChannelId ? 'active' : ''}`
              }
              key={`channel-${channel.id}`}
            >
              <Link
                to={channel.name}
                onClick={(event) => handleChannelSwitch(event, channel.id)}
                className="sidebar__link"
              >
                {channel.name}
                {/* <span className="badge bg-primary rounded-pill"></span> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="channel-view">
        {messagesList.filter((message) => message.channelId === currentChannelId).length > 0
          ? (
            <ul className="list-group">
              {messagesList
                .filter((message) => message.channelId === currentChannelId)
                .map((message) => (
                  <li
                    className="list-group-item"
                    key={`message-${message.id}`}
                  >
                    <h6>{message.author}</h6>
                    {message.text}
                  </li>
                ))}
            </ul>
          )
          : <div className="empty">No messages here yet</div>}
        <form
          className="form message-box"
          noValidate
          onSubmit={(event) => handleMessageSending(event)}
        >
          <div className="input-group  py-1 border rounded-2">
            <input
              id="message"
              name="message"
              placeholder="Write something here ..."
              aria-label="Message"
              className="form-control border-0"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
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
      </div>
    </>
  );
};

export default Main;
