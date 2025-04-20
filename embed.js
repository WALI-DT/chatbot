(async () => {
  const container = document.createElement('div');
  container.id = 'chatbot-container';
  document.body.appendChild(container);

  // Fetch resources
  const html = await fetch('https://wali-dt.github.io/chatbot/index.html').then(res => res.text());
  const style = await fetch('https://wali-dt.github.io/chatbot/style.css').then(res => res.text());
  const script = await fetch('https://wali-dt.github.io/chatbot/script.js').then(res => res.text());

  // Extract body content only
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  container.innerHTML = bodyMatch ? bodyMatch[1] : html;

  // Inject style
  const styleTag = document.createElement('style');
  styleTag.textContent = style;
  document.head.appendChild(styleTag);

  // Inject script
  const scriptTag = document.createElement('script');
  scriptTag.textContent = script;
  document.body.appendChild(scriptTag);
})();

