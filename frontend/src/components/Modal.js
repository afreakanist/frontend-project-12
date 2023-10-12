import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { actions as modalActions } from '../slices/modalSlice';
import { handleChannel } from '../utils/chatApi';

const ModalBox = () => {
  const [name, setName] = useState('');
  const { show, action, title } = useSelector((state) => state.modal.modal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  const handleChannelAction = (event) => {
    event.preventDefault();

    handleChannel({ action, name })
      .then(() => {
        handleCloseModal();
        setName('');
        // TO DO: switch channel to new
      })
      .catch((err) => console.error(err));
  };

  const handleNameChange = (e) => setName(e.target.value);

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleChannelAction} id="channel-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Write new channel name here..."
              value={name}
              autoComplete="off"
              onChange={handleNameChange}
            />
            <Form.Text className="text-muted">
              Note: Channel name must be unique
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="channel-form">OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBox;
