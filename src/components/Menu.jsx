import { useContext, useEffect, useRef, useState } from 'react';
import { Cog } from './Icons';
import { DataContext } from '../context/data';
import { clearData } from '../services/dataServices';

export default function Menu() {
  const { removeAll } = useContext(DataContext);
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
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">
              Earnings
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
