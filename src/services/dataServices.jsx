export function removeData(id) {
  chrome.storage.local.get(['data'], function (result) {
    const newData = result.data.filter((row) => row.id !== id);
    chrome.storage.local.set({ data: newData });
  });
}

export function clearData() {
  chrome.storage.local.set({ data: [] });
}

export function changeFavoriteStatus(id) {
  chrome.storage.local.get(['data'], function (result) {
    const newData = result.data.map((row) => {
      if (row.id === id) {
        return { ...row, isFav: !row.isFav };
      }
      return row;
    });
    chrome.storage.local.set({ data: newData });
  });
}

export function changeTitle(id, title) {
  chrome.storage.local.get(['data'], function (result) {
    const newData = result.data.map((row) => {
      if (row.id === id) {
        return { ...row, title };
      }
      return row;
    });
    chrome.storage.local.set({ data: newData });
  });
}
