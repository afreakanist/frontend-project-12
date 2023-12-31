import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';
import { signup } from '../utils/api';

const Signup = () => {
  const [signupError, setSignupError] = useState(null);
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
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .min(3, 'userForm.error.usernameMin')
        .max(20, 'userForm.error.usernameMax')
        .required('form.error.required')
        .test({
          name: 'profanity-check',
          test(value, ctx) {
            if (filter.badWordsUsed(value).length) {
              return ctx.createError({ message: 'userForm.error.usernameProfanity' });
            }
            return true;
          },
        }),
      password: Yup.string()
        .trim()
        .min(6, 'userForm.error.passwordMin')
        .required('form.error.required'),
      passwordConfirmation: Yup.string()
        .trim()
        .required('userForm.error.passwordConfirmationRequired')
        .oneOf([Yup.ref('password'), null], 'userForm.error.passwordConfirmationMatch'),
    }),
    onSubmit: (values) => {
      signup(values)
        .then((userData) => {
          handleLogin(userData);
          navigate(routes.mainPage);
        })
        .catch((error) => {
          const { message, statusCode } = error.response.data;
          setSignupError({ message, statusCode });
        })
        .finally(() => formik.setSubmitting(false));
    },
  });

  const handleChange = (event) => {
    setSignupError(null);
    formik.handleChange(event);
  };

  return (
    <main className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
      <Form onSubmit={formik.handleSubmit} className="auth-form d-flex flex-column justify-content-center align-items-center">
        <Form.Group className="mb-3 w-100">
          <Form.Label htmlFor="username">
            {t('userForm.label.signupUsername')}
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
            <Form.Text className="text-danger">{t(formik.errors.passwordConfirmation)}</Form.Text>
          ) : null}
        </Form.Group>

        { signupError && <div className="mb-3 text-danger text-center">{t(`requestError.${signupError?.statusCode}`, signupError)}</div>}

        <Button
          type="submit"
          className="w-100"
          disabled={formik.isSubmitting}
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
            : t('userForm.submitBtn.signup')}
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
