import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, 'Must be 4 characters or more')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be 8 characters or more')
        .required('Required'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        User name
      </label>
      {formik.touched.username && formik.errors.username ? (
        <span>{formik.errors.username}</span>
      ) : null}

      <label htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        Password
      </label>
      {formik.touched.password && formik.errors.password ? (
        <span>{formik.errors.password}</span>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
