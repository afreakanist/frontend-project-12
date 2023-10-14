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

  const handleChannelRemoving = () => {
    handleChannel({ action, ...data });
    handleCloseModal();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data?.name || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .min(4, 'Must be 4 characters or more')
        .required('Required')
        .test({
          name: 'custom-check',
          test(value, ctx) {
            if (action === 'rename' && value === data?.name) {
              return ctx.createError({ message: 'Nothing seems to change. Click "Cancel" if you changed your mind' });
            }
            if (channelsNames.includes(value)) {
              return ctx.createError({ message: 'Channel name must be unique!' });
            }
            return true;
          },
        }),
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
        {action === 'remove'
          ? <p className="lead">Are you sure?</p>
          : (
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
                {formik.errors.name
                  ? <Form.Text className="text-danger">{formik.errors.name}</Form.Text>
                  : null}
              </Form.Group>
            </Form>
          )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        {action === 'remove'
          ? <Button variant="danger" onClick={handleChannelRemoving}>Remove</Button>
          : (
            <Button
              type="submit"
              form="channel-form"
              disabled={formik.errors.name}
            >
              OK
            </Button>
          )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalBox;
