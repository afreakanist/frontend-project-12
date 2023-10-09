import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="main-container not-found">
    <div className="not-found__wrapper">
      <div className="not-found__error">
        <h1 className="not-found__status">404</h1>
        <p className="not-found__message">Page not found</p>
      </div>
      <Link to="/" className="not-found__link">
        Go to main page
      </Link>
    </div>
  </main>
);

export default NotFound;
