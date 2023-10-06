import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = ({ onLogin, error }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .min(4, 'Must be 4 characters or more')
        .required('Required'),
      password: Yup.string()
        .trim()
        .min(4, 'Must be 4 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      onLogin(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form d-flex flex-column align-items-center">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          User name
          <input
            id="username"
            name="username"
            type="text"
            className={
              `form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
        </label>
        {formik.touched.username && formik.errors.username ? (
          <div className="text-danger">{formik.errors.username}</div>
        ) : null}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
          <input
            id="password"
            name="password"
            type="password"
            className={
              `form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-danger">{formik.errors.password}</div>
        ) : null}
      </div>

      { error && <div className="mb-3 text-danger">{error}</div>}

      <button
        type="submit"
        className={
          `btn ${error || (Object.keys(formik.touched).length && Object.keys(formik.errors).length)
            ? 'btn-secondary disabled'
            : 'btn-primary'}`
          }
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
