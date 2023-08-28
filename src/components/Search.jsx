import { Magnifier } from './Icons';

export default function Search() {
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
          className="block p-1.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for content or tags"
        />
      </div>
    </div>
  );
}
