(async () => {
  const container = document.createElement('div');
  container.id = 'chatbot-container';
  document.body.appendChild(container);

  const html = await fetch('https://wali-dt.github.io/chatbot/widget.html').then(res => res.text());
  const style = await fetch('https://wali-dt.github.io/chatbot/style.css').then(res => res.text());
  const script = await fetch('https://wali-dt.github.io/chatbot/script.js').then(res => res.text());

  container.innerHTML = html;

  const styleTag = document.createElement('style');
  styleTag.textContent = style;
  document.head.appendChild(styleTag);

  const scriptTag = document.createElement('script');
  scriptTag.textContent = script;
  document.body.appendChild(scriptTag);
})();
