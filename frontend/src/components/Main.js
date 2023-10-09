import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { switchChannel } from '../slices/channelsSlice';

const Main = () => {
  const { currentChannelId, channelsList } = useSelector((state) => state.channels);
  const { messagesList } = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const handleChannelSwitch = (event, id) => {
    event.preventDefault();
    dispatch(switchChannel(id));
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
        {messagesList.length > 0
          ? (
            <ul className="list-group">
              {messagesList
                .filter((message) => message.channelId === currentChannelId)
                .map((message) => (
                  <li
                    className="list-group-item"
                    key={`message-${message.id}`}
                  >
                    {message.text}
                  </li>
                ))}
            </ul>
          )
          : <div className="empty">No messages here yet</div>}
      </div>
    </>
  );
};

export default Main;
