import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';
import { ReactComponent as AddChannelIcon } from '../assets/plus.svg';

const Sidebar = () => {
  const { currentChannelId, channels } = useSelector((state) => state.channels);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChannelSwitch = (id) => {
    dispatch(channelsActions.switchChannel(id));
  };

  const handleShowModal = (action, data) => {
    dispatch(modalActions.showModal({ action, data }));
  };

  return (
    <div className="sidebar bg-body-tertiary border-end">
      <div className="d-flex justify-content-between align-items-center border-bottom p-4">
        <h2 className="m-0 fs-5">{t('channels.title')}</h2>
        <Button
          id="add-channel-btn"
          className="bg-transparent p-0 border-0 shadow-none text-dark"
          onClick={() => handleShowModal('new')}
        >
          <AddChannelIcon />
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
            className="channels-list__item border-0"
          >
            <Dropdown as={ButtonGroup} className="d-flex">
              <Button className="text-start text-truncate text-dark rounded-0 bg-transparent border-0 p-1">{`# ${channel.name}`}</Button>

              {channel.removable && (
              <>
                <Dropdown.Toggle split variant="light" id={`channel-${channel.id}-toggle`} className="flex-grow-0 bg-transparent border-0" />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleShowModal('rename', channel)}>{t('channels.rename')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleShowModal('remove', channel)}>{t('channels.remove')}</Dropdown.Item>
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
