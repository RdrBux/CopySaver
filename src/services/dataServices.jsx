export function clearData() {
  chrome.storage.local.set({ data: [] });
}
