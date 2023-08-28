import { ArrowLeft, ArrowRight } from './Icons';

export default function Pagination() {
  return (
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-900">1</span> to{' '}
        <span className="font-semibold text-gray-900">10</span> of{' '}
        <span className="font-semibold text-gray-900">100</span> Entries
      </span>

      <div className="inline-flex">
        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900">
          {ArrowLeft}
          Prev
        </button>
        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900">
          Next
          {ArrowRight}
        </button>
      </div>
    </div>
  );
}
