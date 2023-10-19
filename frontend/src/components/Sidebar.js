import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalSlice';

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="24" height="24" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
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
