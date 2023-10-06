import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import NotFound from './components/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
