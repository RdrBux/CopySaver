import { clearData } from '../services/dataServices';

export default function RemoveDataModal({ hideModal }) {
  function handleDelete() {
    clearData();
    hideModal();
  }

  return (
    <div className="bg-white shadow w-[500px] p-6 rounded-lg flex flex-col gap-6">
      <h3 className="font-bold text-2xl text-gray-900">Delete all content?</h3>
      <div className="text-gray-500 text-base">
        <p>
          You will lose all content collected in this extension. We can&apos;t
          recover them once you delete.
        </p>
        <p className="mt-2">
          You can save a backup copy of your data from the menu before
          continuing.
        </p>
      </div>
      <div className="flex justify-end gap-4 font-medium">
        <button
          onClick={hideModal}
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Delete all
        </button>
      </div>
    </div>
  );
}
