import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';

const Sidebar = () => {
  const { currentChannelId, channels } = useSelector((state) => state.channels);

  const dispatch = useDispatch();

  const handleChannelSwitch = (id) => {
    dispatch(channelsActions.switchChannel(id));
  };

  const handleShowModal = () => {
    dispatch(modalActions.showModal({ title: 'Add new channel', action: 'new' }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__section-header d-flex justify-content-between align-items-center">
        <h2 className="sidebar__section-name">Channels</h2>
        <Button
          variant="outline-light"
          onClick={handleShowModal}
        >
          Add
        </Button>
      </div>
      <ListGroup variant="flush">
        {channels.map((channel) => (
          <ListGroup.Item
            key={channel.id}
            action
            active={channel.id === currentChannelId}
            onClick={() => handleChannelSwitch(channel.id)}
          >
            {`# ${channel.name}`}
            {/* <Badge pill bg="warning" text="dark">
              TO DO: count __unread__ messages
            </Badge> */}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
