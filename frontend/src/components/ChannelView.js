import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import ListGroup from 'react-bootstrap/ListGroup';
import MessageForm from './MessageForm';

const ChannelView = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const selectMessages = (state) => state.messages.messages;
  const selectCurrChannelMessages = createSelector(selectMessages, (messages) => messages
    .filter((message) => message.channelId === currentChannelId));
  const messages = useSelector(selectCurrChannelMessages);
  const { t } = useTranslation();
  const anchorElem = useRef(null);

  useEffect(() => {
    if (messages.length) {
      anchorElem.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages.length]);

  return (
    <div className="channel-view overflow-hidden-scroll h-100 d-flex flex-column justify-content-end">
      {messages.length
        ? (
          <ListGroup variant="flush" as="ul" className="overflow-hidden-scroll">
            {messages.map((message) => (
              <ListGroup.Item
                key={`message-${message.id}`}
                as="li"
                className="bg-transparent border-0"
              >
                <div className="text-break mb-2">
                  <span className="fw-bold">{`${message.username}: `}</span>
                  {message.body}
                </div>
              </ListGroup.Item>
            ))}
            <div ref={anchorElem} />
          </ListGroup>
        )
        : <div className="w-100 text-center">{t('messages.noMessages')}</div>}
      <MessageForm />
    </div>
  );
};

export default ChannelView;
