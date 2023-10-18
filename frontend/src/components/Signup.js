import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const Signup = ({ onSignup, error, setError }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .min(3, 'Username min length is 3 characters')
        .max(20, 'Username max length is 20 characters')
        .required('This field is required'),
      password: Yup.string()
        .trim()
        .min(6, 'Password min length is 6 characters')
        .required('This field is required'),
      passwordConfirmation: Yup.string()
        .trim()
        .required('Please confirm your password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
            Username
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
            Password
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
            Confirm password
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
            : 'Submit'}
        </Button>
      </Form>
      <Link to="/login" className="mt-3">Log in</Link>
    </main>
  );
};

export default Signup;
