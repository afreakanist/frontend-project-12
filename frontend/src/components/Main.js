import ChannelView from './ChannelView';
import Sidebar from './Sidebar';
import Modal from './Modal';

const Main = () => (
  <main className="flex-grow-1 overflow-hidden">
    <Sidebar />
    <ChannelView />
    <Modal />
  </main>
);

export default Main;
