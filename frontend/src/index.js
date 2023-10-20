import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import filter from 'leo-profanity';

import './index.css';
import App from './App';
import store from './slices/index';
import en from './locales/en';
import ru from './locales/ru';

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

  const ruSwearWords = filter.getDictionary(defaultLng);
  filter.add(ruSwearWords);

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <I18nextProvider i18n={i18nInstance}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>,
  );
};

app();
