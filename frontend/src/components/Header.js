import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import CurrentUserCtx from '../contexts/CurrentUserCtx';

const Header = ({ onLogout }) => {
  const currentUser = useContext(CurrentUserCtx);
  const { t } = useTranslation();

  return (
    <header className="header w-100 border-bottom">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          {currentUser.isLoggedIn
            ? <Button onClick={onLogout}>{t('header.logOutBtn')}</Button>
            : null}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
