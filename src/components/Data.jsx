import { useEffect, useState } from 'react';

export default function Data() {
  const [data, setData] = useState([]);
  // Get data from chrome storage
  useEffect(() => {
    chrome.storage.local.get(['data'], function (result) {
      setData(JSON.stringify(result.data, null, 2));
    });
  }, []);

  return (
    <div className="absolute left-0 right-0 bottom-0 h-fit z-20 p-4 bg-red-200/90">
      {data}
    </div>
  );
}
