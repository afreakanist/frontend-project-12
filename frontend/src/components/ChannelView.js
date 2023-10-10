import { useSelector } from 'react-redux';
import MessageForm from './MessageForm';

const ChannelView = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);

  return (
    <div className="channel-view">
      {messages?.filter((message) => message.channelId === currentChannelId).length > 0
        ? (
          <ul className="list-group">
            {messages
              .filter((message) => message.channelId === currentChannelId)
              .map((message) => (
                <li
                  className="list-group-item"
                  key={`message-${message.id}`}
                >
                  <p>
                    <span>{`${message.username}: `}</span>
                    {message.body}
                  </p>
                </li>
              ))}
          </ul>
        )
        : <div className="empty">No messages here yet</div>}
      <MessageForm />
    </div>
  );
};

export default ChannelView;
