import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { switchChannel } from '../slices/channelsSlice';
import ChannelView from './ChannelView';

const Main = () => {
  const { currentChannelId, channelsList } = useSelector((state) => state.channels);

  const dispatch = useDispatch();

  const handleChannelSwitch = (event, id) => {
    event.preventDefault(); // no location change
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
                {/* <span className="badge bg-primary rounded-pill">
                  {messages.filter(({ channelId }) => channelId === channel.id).length}
                </span> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ChannelView />
    </>
  );
};

export default Main;
