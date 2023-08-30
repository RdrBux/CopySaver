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
  const [textFilter, setTextFilter] = useState('');

  const textFilteredData = data.filter(
    (row) =>
      row.content.toLowerCase().includes(textFilter) ||
      row.tags.toLowerCase().includes(textFilter)
  );

  const tabFilteredData =
    selectedTab === TABS.FAV
      ? textFilteredData.filter((row) => row.isFav)
      : textFilteredData;

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

  function removeOne(id) {
    const newData = data.filter((row) => row.id !== id);
    setData(newData);
  }

  function showAll() {
    setSelectedTab(TABS.ALL);
  }

  function showFav() {
    setSelectedTab(TABS.FAV);
  }

  function changeTextFilter(e) {
    setTextFilter(e.target.value.toLowerCase());
  }

  return (
    <DataContext.Provider
      value={{
        data: paginatedData,
        page,
        nextPage,
        prevPage,
        dataLength: tabFilteredData.length,
        allDataLength: data.length,
        setFavorite,
        showAll,
        showFav,
        selectedTab,
        textFilter,
        changeTextFilter,
        removeOne,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
