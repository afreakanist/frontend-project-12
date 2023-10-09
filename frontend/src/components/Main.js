import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { switchChannel } from '../slices/channelsSlice';

const Main = () => {
  const { currentChannelId, channelsList } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const handleChannelSwitch = (id) => {
    dispatch(switchChannel(id));
  };

  return (
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
              onClick={() => handleChannelSwitch(channel.id)}
              className="sidebar__link"
            >
              {channel.name}
              {/* <span className="badge bg-primary rounded-pill"></span> */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
