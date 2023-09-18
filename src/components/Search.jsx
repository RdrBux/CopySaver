import { useContext } from 'react';
import { DataContext } from '../context/data';
import { Magnifier } from './Icons';

export default function Search() {
  const { textFilter, changeTextFilter } = useContext(DataContext);

  return (
    <div className="-mt-1">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {Magnifier}
        </div>
        <input
          type="text"
          id="table-search"
          value={textFilter}
          onChange={changeTextFilter}
          className="block p-1.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-64 bg-gray-50 focus:ring-4 outline-none focus:ring-blue-300"
          placeholder="Search by content or title"
        />
      </div>
    </div>
  );
}
