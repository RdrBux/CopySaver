// Initial setup
chrome.runtime.onInstalled.addListener(() => {
  // Create empty data in db in nonexistent
  chrome.storage.local.get(['data'], function (result) {
    if (!result.data) {
      chrome.storage.local.set({ data: [] });
    }
    // Update badge
    chrome.action.setBadgeText({ text: result.data.length.toString() ?? '0' });
  });

  // Get variable called active from db or create if it doesn't exists
  chrome.storage.local.get(['active'], function (result) {
    if (result.active === undefined) {
      chrome.storage.local.set({ active: true });
    }
  });
});

// Set badge every time chrome opens
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['data'], function (result) {
    // Update badge
    chrome.action.setBadgeText({ text: result.data.length.toString() ?? '0' });
  });
});

// check for db updates to change badge
chrome.storage.onChanged.addListener((changes) => {
  if (!changes.data) return;
  const dataLength = changes.data.newValue.length;
  chrome.action.setBadgeText({ text: dataLength.toString() });
});

chrome.runtime.onMessage.addListener((request) => {
  // Get value of active variable from db
  chrome.storage.local.get(['active'], function (result) {
    // Return if active is false
    if (!result.active) return;

    chrome.storage.local.get(['data'], function (result) {
      let data = Array.isArray(result.data) ? result.data : [];
      data = isInStore(data, request.text);
      chrome.storage.local.set({ data });
    });
  });
});

function isInStore(data, text) {
  const index = data.findIndex((item) => item.content === text);

  if (index === -1) {
    data.unshift({
      content: text,
      date: new Date().toISOString(),
      isFav: false,
      id: crypto.randomUUID(),
      title: '',
    });
  } else {
    data[index] = { ...data[index], date: new Date().toISOString() };
  }
  return data;
}
