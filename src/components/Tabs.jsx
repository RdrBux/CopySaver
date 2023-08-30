import { useContext } from 'react';
import { DataContext } from '../context/data';
import { TABS } from '../utils/constants';

export default function Tabs() {
  const { showAll, showFav, selectedTab } = useContext(DataContext);

  return (
    <ul className="flex flex-wrap -mb-px text-sm font-medium text-gray-500">
      <li className="mr-2">
        <button
          onClick={showAll}
          className={`${
            selectedTab === TABS.ALL
              ? 'text-blue-600 border-blue-600'
              : 'border-transparent hover:border-gray-300 hover:text-gray-600'
          } inline-block px-4 py-3 border-b-2 rounded-t-lg`}
        >
          Show all
        </button>
      </li>
      <li className="mr-2">
        <button
          onClick={showFav}
          className={`${
            selectedTab === TABS.FAV
              ? 'text-blue-600 border-blue-600'
              : 'border-transparent hover:border-gray-300 hover:text-gray-600'
          } inline-block px-4 py-3 border-b-2 rounded-t-lg`}
        >
          Favorites
        </button>
      </li>
    </ul>
  );
}
