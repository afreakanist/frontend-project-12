import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';

import { ReactComponent as SelectLanguageIcon } from '../assets/select-language.svg';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

const Header = () => {
  const { user, handleLogout } = useAuth();
  const { t, i18n } = useTranslation();

  const handleLngChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header w-100 border-bottom">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href={routes.mainPage}>Hexlet Chat</Navbar.Brand>
          <Navbar.Collapse>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="select-lng" className="rounded p-1 ms-2">
                <SelectLanguageIcon />
              </Dropdown.Toggle>
              <Dropdown.Menu className="languages-list">
                <Dropdown.Item
                  active={i18n.language === 'en'}
                  onClick={() => handleLngChange('en')}
                  className="languages-list__item"
                >
                  {t('header.languages.en')}
                </Dropdown.Item>
                <Dropdown.Item
                  active={i18n.language === 'ru'}
                  onClick={() => handleLngChange('ru')}
                  className="languages-list__item"
                >
                  {t('header.languages.ru')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
          {user?.isLoggedIn
            ? <Button onClick={handleLogout}>{t('header.logOutBtn')}</Button>
            : null}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
