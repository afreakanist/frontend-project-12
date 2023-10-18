import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import CurrentUserCtx from '../contexts/CurrentUserCtx';

const Header = ({ onLogout }) => {
  const currentUser = useContext(CurrentUserCtx);

  return (
    <header className="header w-100">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          {currentUser.isLoggedIn
            ? <Button onClick={onLogout}>Log out</Button>
            : null}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
