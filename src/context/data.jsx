import { createContext, useState } from 'react';
import { TABS } from '../utils/constants';
import { useData } from '../hooks/useData';
import {
  changeFavoriteStatus,
  changeTitle,
  removeData,
} from '../services/dataServices';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  /* const { data } = useData(); */
  const { data } = useData();
  const [page, setPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(TABS.ALL);
  const [textFilter, setTextFilter] = useState('');

  const textFilteredData = data.filter(
    (row) =>
      row.content.toLowerCase().includes(textFilter) ||
      row.title.toLowerCase().includes(textFilter)
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
    changeFavoriteStatus(id);
  }

  function removeOne(id) {
    removeData(id);
  }

  function editTitle(id, title) {
    changeTitle(id, title);
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
        editTitle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
