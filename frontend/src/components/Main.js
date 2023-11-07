import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { getData } from '../utils/api';
import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';
import ChannelView from './ChannelView';
import Sidebar from './Sidebar';
import Modal from './Modal';

const Main = () => {
  const {
    user, requestError, setRequestError, handleError, buildAuthHeaders,
  } = useAuth();
  const dispatch = useDispatch();

  const getChatData = () => {
    getData(buildAuthHeaders())
      .then(({ channels, messages }) => {
        setRequestError(null);
        dispatch(channelsActions.setChannels(channels));
        dispatch(messagesActions.setMessages(messages));
      })
      .catch((error) => {
        handleError(error, 'getData');
        toast.error(requestError?.key, requestError?.values);
      });
  };

  useEffect(() => {
    if (user?.isLoggedIn) {
      getChatData();
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
