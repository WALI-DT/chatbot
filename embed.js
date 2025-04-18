(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://wali-dt.github.io/chatbot/";
  iframe.style.width = "400px";
  iframe.style.height = "600px";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "16px";
  iframe.style.zIndex = "9999";
  iframe.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  document.body.appendChild(iframe);
})();
