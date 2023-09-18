import { useState, useEffect } from 'react';
import { mockData } from '../mock/data';

export function useData() {
  const [data, setData] = useState([]);

  /* useEffect(() => {
    const fetchData = () => {
      chrome.storage.local.get(['data'], function (result) {
        console.log(result.data);
        setData(result.data);
      });
    };

    fetchData();
  }, []); */

  return { data: mockData };
}
