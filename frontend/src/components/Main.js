import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { getChatData } from '../slices/channelsSlice';
import ChannelView from './ChannelView';
import Sidebar from './Sidebar';
import Modal from './Modal';
import routes from '../utils/routes';

const Main = () => {
  const { buildAuthHeaders, handleLogout } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getChatData(buildAuthHeaders()))
      .unwrap()
      .catch((error) => {
        handleLogout();
        const { message, statusCode } = error.response.data;
        toast.error(t('toast.error.getChatData', { message, statusCode }));
        navigate(routes.loginPage);
      });
  }, []);

  return (
    <main className="flex-grow-1 overflow-hidden">
      <Sidebar />
      <ChannelView />
      <Modal />
    </main>
  );
};

export default Main;
