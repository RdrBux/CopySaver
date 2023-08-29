import { useState, useEffect } from 'react';
import { data as mockData } from '../mock/data';

export function useData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = mockData;
      setData(fetchedData);
    };

    fetchData();
  }, [data]);

  return { data };
}
