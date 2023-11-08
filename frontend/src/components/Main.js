import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { getChatData } from '../slices/channelsSlice';
import ChannelView from './ChannelView';
import Sidebar from './Sidebar';
import Modal from './Modal';

const Main = () => {
  const {
    user, requestError, handleError, buildAuthHeaders,
  } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.isLoggedIn) {
      dispatch(getChatData(buildAuthHeaders()))
        .unwrap()
        .catch((error) => {
          handleError(error, 'getData');
          toast.error(requestError?.key, requestError?.values);
        });
    }
  }, [user?.isLoggedIn]);

  return (
    <main className="flex-grow-1 overflow-hidden">
      <Sidebar />
      <ChannelView />
      <Modal />
    </main>
  );
};

export default Main;
