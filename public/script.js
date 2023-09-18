console.log('script loaded');

window.addEventListener('copy', () => {
  const selectedText = window.getSelection().toString();
  console.log(selectedText);
  chrome.runtime.sendMessage({
    text: selectedText,
  });
});
