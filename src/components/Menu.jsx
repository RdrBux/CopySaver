import { useContext, useEffect, useRef, useState } from 'react';
import { Cog } from './Icons';
import { DataContext } from '../context/data';
import { clearData } from '../services/dataServices';
import { formatISO } from 'date-fns';

export default function Menu() {
  const { data, removeAll } = useContext(DataContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const menu = useRef();

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
    clearData();
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

  return (
    <div ref={menu}>
      <button
        onClick={() => setMenuVisible((prev) => !prev)}
        className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-700 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300"
        type="button"
      >
        {Cog}
      </button>

      <div
        className={`${
          menuVisible ? 'block' : 'hidden'
        } z-10 absolute right-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <button
              onClick={saveDataToJSON}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Save data to file
            </button>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Import from file
            </a>
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
