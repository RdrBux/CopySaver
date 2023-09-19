import { useEffect, useState } from 'react';

export default function Toggler() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // get active value from db
    chrome.storage.local.get(['active'], function (result) {
      setIsActive(result.active);
    });
  });

  function handleChange() {
    chrome.storage.local.set({ active: !isActive });
    setIsActive(!isActive);
  }

  return (
    <div className="grid place-content-center">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isActive}
          className="sr-only peer"
          onChange={handleChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
