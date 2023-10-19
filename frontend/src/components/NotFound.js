import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="d-flex flex-column align-items-center justify-content-center flex-grow-1 not-found">
      <div className="not-found__wrapper">
        <div className="not-found__error">
          <h1 className="not-found__status">404</h1>
          <p className="not-found__message">{t('notFound.error')}</p>
        </div>
        <Link to="/" className="not-found__link">
          {t('notFound.link')}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
