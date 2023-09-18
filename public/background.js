console.log('background.js loaded');

// check for db updates to change badge
chrome.storage.onChanged.addListener((changes) => {
  const dataLength = changes.data.newValue.length;
  chrome.action.setBadgeText({ text: dataLength.toString() });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.storage.local.get(['data'], function (result) {
    let data = Array.isArray(result.data) ? result.data : [];
    data = isInStore(data, request.text);
    chrome.storage.local.set({ data });
  });
});

function isInStore(data, text) {
  const index = data.findIndex((item) => item.content === text);

  if (index === -1) {
    data.push({
      content: text,
      date: new Date().toString(),
      isFav: false,
      id: crypto.randomUUID(),
      title: '',
    });
  } else {
    data[index] = { ...data[index], date: new Date() };
  }
  return data;
}
