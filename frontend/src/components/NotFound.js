import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="not-found d-flex flex-column align-items-center justify-content-center flex-grow-1">
      <div className="not-found__wrapper d-flex flex-column justify-content-center">
        <div className="not-found__error">
          <h1 className="not-found__status m-0">404</h1>
          <p className="not-found__message text-center">{t('notFound.error')}</p>
        </div>
        <Link to="/" className="not-found__link text-center">
          {t('notFound.link')}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
