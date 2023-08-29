document.addEventListener('copy', () => {
  navigator.clipboard.readText().then((copiedText) => {
    chrome.storage.local.get(['data'], (result) => {
      const newData = result.data ?? [];
      newData.push(copiedText);

      chrome.storage.local.set({ data: newData });
    });
  });
});
