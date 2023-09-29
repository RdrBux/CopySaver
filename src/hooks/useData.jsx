import { useState, useEffect } from 'react';
export function useData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('getting data');
    chrome.storage.local.get(['data'], function (result) {
      setData(result.data);
    });

    chrome.storage.onChanged.addListener((changes) => {
      if ('data' in changes) {
        setData(changes.data.newValue);
      }
    });
  }, []);

  return { data };
}
