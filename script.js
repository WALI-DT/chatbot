async function sendMessage() {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (!text) return;

  const chatMessages = document.getElementById("chatMessages");
  chatMessages.innerHTML += `<div class="message user">${text}</div>`;
  input.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const typingIndicator = document.createElement("div");
  typingIndicator.className = "message bot typing";
  typingIndicator.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  chatMessages.appendChild(typingIndicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch("https://abdul-wali.app.n8n.cloud/webhook/c0423075-9067-4e31-b2a1-c32c0e4a3ac8", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    if (!data.reply) throw new Error("No reply found in response");

    typingIndicator.remove();
    const formattedReply = marked.parse(data.reply);
    chatMessages.innerHTML += `<div class="message bot">${formattedReply}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (error) {
    typingIndicator.remove();
    chatMessages.innerHTML += `<div class="message bot">⚠️ Error: ${error.message}</div>`;
    console.error("Error in sendMessage:", error);
  }
}
