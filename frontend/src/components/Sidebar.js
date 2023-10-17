import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';

const Sidebar = () => {
  const { currentChannelId, channels } = useSelector((state) => state.channels);

  const dispatch = useDispatch();

  const handleChannelSwitch = (id) => {
    dispatch(channelsActions.switchChannel(id));
  };

  const handleShowModal = (action, data) => {
    dispatch(modalActions.showModal({ action, data }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__section-header d-flex justify-content-between align-items-center">
        <h2 className="sidebar__section-name">Channels</h2>
        <Button
          variant="outline-light"
          onClick={() => handleShowModal('new')}
        >
          Add
        </Button>
      </div>
      <ListGroup variant="flush" as="ul" className="channels-list overflow-hidden-scroll">
        {channels.map((channel) => (
          <ListGroup.Item
            key={channel.id}
            as="li"
            action
            active={channel.id === currentChannelId}
            onClick={() => handleChannelSwitch(channel.id)}
            className="bg-transparent border-0"
          >
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button className="text-start text-truncate rounded-0 bg-transparent border-0">{`# ${channel.name}`}</Button>

              {channel.removable && (
              <>
                <Dropdown.Toggle split id={`channel-${channel.id}-dropdown-split`} className="flex-grow-0 bg-transparent border-0 rounded-0" />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleShowModal('rename', { id: channel.id, name: channel.name })}>Rename</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShowModal('remove', { id: channel.id })}>Remove</Dropdown.Item>
                </Dropdown.Menu>
              </>
              )}
            </Dropdown>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
