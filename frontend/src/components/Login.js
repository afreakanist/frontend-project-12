import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const { handleLogin } = useAuth();
  const { t } = useTranslation();
  const inputElem = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputElem.current) {
      inputElem.current.focus();
    }
  }, []);

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .required('form.error.required'),
      password: Yup.string()
        .trim()
        .required('form.error.required'),
    }),
    onSubmit: async (values) => {
      try {
        await handleLogin(values);
        navigate(routes.mainPage);
      } catch (error) {
        const { message, statusCode } = error.response.data;
        setLoginError({ message, statusCode });
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const handleChange = (event) => {
    setLoginError(null);
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
            ref={inputElem}
          />
          {formik.touched.username && formik.errors.username ? (
            <Form.Text className="text-danger">{t(formik.errors.username)}</Form.Text>
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
            <Form.Text className="text-danger">{t(formik.errors.password)}</Form.Text>
          ) : null}
        </Form.Group>

        { loginError && <div className="mb-3 text-danger text-center">{t(`requestError.${loginError?.statusCode}`, loginError)}</div>}

        <Button
          type="submit"
          className="w-100"
          variant={
            loginError
              || (Object.keys(formik.touched).length && Object.keys(formik.errors).length)
              ? 'secondary'
              : 'primary'
          }
          disabled={!!loginError || Object.keys(formik.errors).length || formik.isSubmitting}
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
            : t('userForm.submitBtn.login')}
        </Button>
      </Form>
      <div className="text-center m-3">
        <span>{t('userForm.noAccount')}</span>
        <Link to="/signup">{t('userForm.link.signUp')}</Link>
      </div>
    </main>
  );
};

export default Login;
