import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { sendMessage } from '../utils/chatApi';
import CurrentUserCtx from '../contexts/CurrentUserCtx';

const MessageForm = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { username } = useContext(CurrentUserCtx);
  const { t } = useTranslation();

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      message: '',
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .trim()
        .required(t('messageForm.error.required')),
    }),
    onSubmit: ({ message }) => {
      const newMessage = {
        body: message,
        channelId: currentChannelId,
        username,
      };

      sendMessage(newMessage)
        .then(() => formik.handleReset())
        .catch((error) => console.error(error))
        .finally(() => formik.setSubmitting(false));
    },
  });

  return (
    <Form
      className="message-box w-100"
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Form.Group className="input-group py-1 border rounded-2 justify-content-between">
        <Form.Control
          id="message"
          name="message"
          placeholder={t('messageForm.placeholder.message')}
          aria-label="Message"
          className="border-0"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        <Button
          type="submit"
          className="btn-group-vertical bg-transparent text-dark border-0 rounded-0"
          disabled={formik.errors.message || formik.isSubmitting}
        >
          {formik.isSubmitting
            ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="dark"
              />
            )
            : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" /></svg>
                <span className="visually-hidden">{t('messageForm.sendBtn')}</span>
              </>
            )}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
