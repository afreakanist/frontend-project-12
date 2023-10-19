import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const Signup = ({ onSignup, error, setError }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .min(3, t('userForm.error.usernameMin'))
        .max(20, t('userForm.error.usernameMax'))
        .required(t('form.error.required')),
      password: Yup.string()
        .trim()
        .min(6, t('userForm.error.passwordMin'))
        .required(t('form.error.required')),
      passwordConfirmation: Yup.string()
        .trim()
        .required(t('userForm.error.passwordConfirmationRequired'))
        .oneOf([Yup.ref('password'), null], t('userForm.error.passwordConfirmationMatch')),
    }),
    onSubmit: (values) => {
      onSignup(values).finally(() => formik.setSubmitting(false));
    },
  });

  const handleChange = (event) => {
    setError('');
    formik.handleChange(event);
  };

  return (
    <main className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
      <Form onSubmit={formik.handleSubmit} className="auth-form d-flex flex-column justify-content-center align-items-center">
        <Form.Group className="mb-3 w-100">
          <Form.Label htmlFor="username">
            {t('userForm.label.username')}
          </Form.Label>
          <Form.Control
            id="username"
            name="username"
            type="text"
            className={
              `${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`
            }
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            autoFocus
          />
          {formik.touched.username && formik.errors.username ? (
            <Form.Text className="text-danger">{formik.errors.username}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3 w-100">
          <Form.Label htmlFor="password">
            {t('userForm.label.password')}
          </Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            className={
              `${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`
            }
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <Form.Text className="text-danger">{formik.errors.password}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-3 w-100">
          <Form.Label htmlFor="passwordConfirmation">
            {t('userForm.label.passwordConfirmation')}
          </Form.Label>
          <Form.Control
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            className={
              `${formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? 'is-invalid' : ''}`
            }
            onChange={handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirmation}
          />
          {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
            <Form.Text className="text-danger">{formik.errors.passwordConfirmation}</Form.Text>
          ) : null}
        </Form.Group>

        { error && <div className="mb-3 text-danger">{error}</div>}

        <Button
          type="submit"
          className="w-100"
          variant={
            error || (Object.keys(formik.touched).length && Object.keys(formik.errors).length)
              ? 'secondary'
              : 'primary'
          }
          disabled={!!error || Object.keys(formik.errors).length}
        >
          {formik.isSubmitting
            ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )
            : t('userForm.submitBtn')}
        </Button>
      </Form>
      <div className="text-center m-3">
        <span>{t('userForm.hasAccount')}</span>
        <Link to="/login">{t('userForm.link.logIn')}</Link>
      </div>
    </main>
  );
};

export default Signup;
