import { useContext } from 'react';
import Menu from './components/Menu';
import Pagination from './components/Pagination';
import Search from './components/Search';
import Table from './components/Table';
import Tabs from './components/Tabs';
import Toggler from './components/Toggler';
import { DataContext } from './context/data';
import Data from './components/Data';

function App() {
  const { allDataLength } = useContext(DataContext);

  return (
    <div
      className={`${
        allDataLength > 10 ? 'h-[588px]' : ''
      } w-[650px] relative px-4 py-3 bg-white shadow`}
    >
      <Data />
      <header className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold leading-none tracking-tight text-gray-900">
          CopySaver
        </h1>
        <div className="flex items-center gap-2">
          <Toggler />
          <Menu />
        </div>
      </header>

      <main>
        <div className="flex justify-between border-b border-gray-200">
          <Tabs />
          <Search />
        </div>

        <Table />

        <Pagination />
      </main>
    </div>
  );
}

export default App;
