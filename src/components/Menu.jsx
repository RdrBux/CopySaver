import { useContext, useEffect, useRef, useState } from 'react';
import { Hamburger } from './Icons';
import { DataContext } from '../context/data';
import { setNewData } from '../services/dataServices';
import { formatISO } from 'date-fns';
import StorageDisplay from './StorageDisplay';

export default function Menu({ showModal }) {
  const { data } = useContext(DataContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const menu = useRef();
  const file = useRef();

  useEffect(() => {
    function checkClickOutside(e) {
      if (!menu.current.contains(e.target)) {
        setMenuVisible(false);
      }
    }

    if (menuVisible) {
      document.addEventListener('click', checkClickOutside);
    }

    return () => document.removeEventListener('click', checkClickOutside);
  }, [menuVisible]);

  function handleRemoveAll() {
    showModal();
    setMenuVisible(false);
  }

  function saveDataToJSON() {
    const dataBlob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'text/json;charset=utf-8',
    });
    const blobUrl = URL.createObjectURL(dataBlob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.target = '_blank';
    anchor.download = `CopySaver-${formatISO(new Date(), {
      representation: 'date',
    })}.json`;

    // Auto click on a element, trigger the file download
    anchor.click();

    // This is required
    URL.revokeObjectURL(blobUrl);
  }

  async function handleNewData(e) {
    // Get object from input file
    const newData = e.target.files[0];

    if (!file) return;

    const text = await newData.text();
    const objectData = await JSON.parse(text);

    setNewData(objectData);
  }

  return (
    <div ref={menu}>
      <button
        onClick={() => setMenuVisible((prev) => !prev)}
        className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-700 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300"
        type="button"
      >
        {Hamburger}
      </button>

      <div
        className={`${
          menuVisible ? 'block' : 'hidden'
        } z-10 absolute right-4 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44`}
      >
        <div className="p-4">
          <StorageDisplay />
        </div>
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <button
              onClick={saveDataToJSON}
              className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
            >
              Save backup file
            </button>
          </li>
          <li>
            <button
              onClick={() => file.current.click()}
              className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
            >
              Import from file
            </button>
            <input
              type="file"
              accept="application/JSON"
              ref={file}
              className="hidden"
              onChange={handleNewData}
            />
          </li>
          <li>
            <button
              onClick={handleRemoveAll}
              className="block px-4 py-2 font-medium hover:bg-gray-100 text-red-600 w-full text-left"
            >
              Delete all
            </button>
          </li>
        </ul>
        <div className="py-2">
          <a
            href="http://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Leave a review
          </a>
        </div>
      </div>
    </div>
  );
}
