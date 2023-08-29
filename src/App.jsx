/* "content_scripts": [
  {
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }
] */

import { useContext } from 'react';
import Menu from './components/Menu';
import Pagination from './components/Pagination';
import Search from './components/Search';
import Table from './components/Table';
import Tabs from './components/Tabs';
import Toggler from './components/Toggler';
import { DataContext } from './context/data';

function App() {
  const { data } = useContext(DataContext);

  return (
    <div className="w-[650px] relative h-[572px] px-4 py-3 bg-white rounded shadow">
      <header className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-bold leading-none tracking-tight text-gray-900">
          CopySaver
        </h1>
        <div>
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
