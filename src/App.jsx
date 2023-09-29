import { useContext, useState } from 'react';
import Menu from './components/Menu';
import Pagination from './components/Pagination';
import Search from './components/Search';
import Table from './components/Table';
import Tabs from './components/Tabs';
import Toggler from './components/Toggler';
import { DataContext } from './context/data';
import Modal from './components/Modal';
import RemoveDataModal from './components/RemoveDataModal';
import DataEmpty from './components/DataEmpty';

function App() {
  const { allDataLength } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={`${
        allDataLength > 10 ? 'h-[588px]' : ''
      } w-[650px] relative px-4 py-3 bg-white min-h-[350px] shadow`}
    >
      <header className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold leading-none tracking-tight text-gray-900">
          Copy Saver
        </h1>
        <div className="flex items-center gap-2">
          <Toggler />
          <Menu showModal={() => setShowModal(true)} />
        </div>
      </header>

      <main>
        <div className="flex justify-between border-b border-gray-200">
          <Tabs />
          <Search />
        </div>

        {allDataLength > 0 ? <Table /> : <DataEmpty />}

        <Pagination />
      </main>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <RemoveDataModal hideModal={() => setShowModal(false)} />
      </Modal>
    </div>
  );
}

export default App;
