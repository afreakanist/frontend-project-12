import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MessageForm from './MessageForm';

const ChannelView = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.messages);

  const { t } = useTranslation();

  return (
    <div className="channel-view overflow-hidden-scroll h-100 d-flex flex-column justify-content-end">
      {messages?.filter((message) => message.channelId === currentChannelId).length > 0
        ? (
          <ul className="list-group overflow-hidden-scroll">
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
        : <div className="w-100 text-center">{t('messages.noMessages')}</div>}
      <MessageForm />
    </div>
  );
};

export default ChannelView;
