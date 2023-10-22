import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { useAuth } from '../hooks/useAuth';
import { sendMessage } from '../utils/chatApi';
import { ReactComponent as SendMessageIcon } from '../assets/arrow.svg';

const MessageForm = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { user: { username } } = useAuth();
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
        body: filter.clean(message),
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
                <SendMessageIcon />
                <span className="visually-hidden">{t('messageForm.sendBtn')}</span>
              </>
            )}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default MessageForm;
