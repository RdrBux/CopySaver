import { createContext, useState } from 'react';
import { useData } from '../hooks/useData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { data } = useData();
  const [page, setPage] = useState(1);
  function nextPage() {
    if (page > data.length / 10) return;
    setPage((page) => page + 1);
  }
  function prevPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  const paginatedData = data.slice((page - 1) * 10, page * 10);

  return (
    <DataContext.Provider
      value={{
        data: paginatedData,
        page,
        nextPage,
        prevPage,
        dataLength: data.length,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
