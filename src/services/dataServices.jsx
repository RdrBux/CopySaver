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

export function setNewData(newData) {
  // Validate data
  if (!Array.isArray(newData)) {
    return;
  }

  const validData = newData.every((row) => {
    return (
      typeof row.id === 'string' &&
      typeof row.content === 'string' &&
      typeof row.title === 'string' &&
      typeof row.isFav === 'boolean' &&
      typeof row.date === 'string'
    );
  });

  if (!validData) {
    return;
  }

  // Format data
  const formattedData = newData.map((row) => {
    return {
      id: row.id,
      content: row.content,
      isFav: row.isFav,
      title: row.title,
      date: new Date(row.date).toISOString(),
    };
  });

  // Get data from storage
  chrome.storage.local.get(['data'], function (result) {
    // Add new data
    chrome.storage.local.set({ data: result.data.concat(formattedData) });
  });
}
