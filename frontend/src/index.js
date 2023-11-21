import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import filter from 'leo-profanity';

import './index.css';
import { ApiProvider } from './contexts/ChatCtx';
import { AuthProvider } from './contexts/CurrentUserCtx';
import App from './App';
import store from './slices/index';
import en from './locales/en';
import ru from './locales/ru';

const rollbarConfig = {
  accessToken: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN : null,
  environment: process.env.NODE_ENV,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const app = async () => {
  const defaultLng = 'ru';

  const i18nInstance = i18n.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      resources: {
        en,
        ru,
      },
      fallbackLng: defaultLng,
    });

  const ruSwearWords = filter.getDictionary('ru');
  filter.add(ruSwearWords);

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18nInstance}>
          <Provider store={store}>
            <BrowserRouter>
              <AuthProvider>
                <ApiProvider>
                  <App />
                </ApiProvider>
              </AuthProvider>
            </BrowserRouter>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>,
  );
};

app();
