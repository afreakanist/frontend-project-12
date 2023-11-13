import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { getChatData } from '../slices/channelsSlice';
import ChannelView from './ChannelView';
import Sidebar from './Sidebar';
import Modal from './Modal';

const Main = () => {
  const { buildAuthHeaders } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getChatData(buildAuthHeaders()))
      .unwrap()
      .catch((error) => {
        const { message, statusCode } = error.response.data;
        toast.error(t(`requestError.${statusCode}.getData`, { message, statusCode }));
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
