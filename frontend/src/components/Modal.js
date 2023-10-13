import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { actions as modalActions } from '../slices/modalSlice';
import { handleChannel } from '../utils/chatApi';

const ModalBox = () => {
  const { show, action, data } = useSelector((state) => state.modal.modal);
  const channelsNames = useSelector((state) => state.channels.channels).map((c) => c.name);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(4, 'Must be 4 characters or more')
        .required('Required')
        .notOneOf(channelsNames, 'Channel name must be unique!'),
    }),
    onSubmit: ({ name }) => {
      handleChannel({ action, ...data, name })
        .then(() => {
          handleCloseModal();
          formik.handleReset();
        })
        .catch((err) => console.error(err));
    },
  });

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{`${action} channel`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} id="channel-form">
          <Form.Group className="mb-3" controlId="name">
            <Form.Control
              type="text"
              placeholder="Write new channel name here..."
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <Form.Text className="text-danger">
              {formik.touched.name && formik.errors.name && formik.errors.name}
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="channel-form"
          disabled={formik.touched.name && formik.errors.name}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBox;
