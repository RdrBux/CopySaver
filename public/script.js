window.addEventListener('copy', () => {
  const selectedText = window.getSelection().toString();
  chrome.runtime.sendMessage({
    text: selectedText,
  });
});
