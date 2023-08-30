import { createContext, useState } from 'react';
/* import { useData } from '../hooks/useData'; */
import { data as mockData } from '../mock/data';
import { TABS } from '../utils/constants';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  /* const { data } = useData(); */
  const [data, setData] = useState(mockData);
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(TABS.ALL);

  const tabFilteredData =
    selectedTab === TABS.FAV ? data.filter((row) => row.isFav) : data;

  const paginatedData = tabFilteredData.slice((page - 1) * 10, page * 10);

  function nextPage() {
    if (page > data.length / 10) return;
    setPage((page) => page + 1);
  }
  function prevPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  function setFavorite(id) {
    const newData = data.map((row) => {
      if (row.id === id) {
        return { ...row, isFav: !row.isFav };
      }
      return row;
    });
    setData(newData);
  }

  function showAll() {
    setSelectedTab(TABS.ALL);
  }

  function showFav() {
    setSelectedTab(TABS.FAV);
  }

  return (
    <DataContext.Provider
      value={{
        data: paginatedData,
        page,
        nextPage,
        prevPage,
        dataLength: tabFilteredData.length,
        setFavorite,
        showAll,
        showFav,
        selectedTab,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
