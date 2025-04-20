const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");

function toggleChat() {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
}

async function sendMessage() {
  const input = messageInput;
  const text = input.value.trim();
  if (!text) return;

  const chatMessages = document.getElementById("chatMessages");

  // Show user message
  const userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.textContent = text;
  chatMessages.appendChild(userMessage);
  input.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Typing indicator
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "message bot typing";
  typingIndicator.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`;
  chatMessages.appendChild(typingIndicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch("https://abdul-wali.app.n8n.cloud/webhook/ce41d0ab-44ae-4fd8-aeb6-a4a5f51467e8", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    typingIndicator.remove();

    const botMessage = document.createElement("div");
    botMessage.className = "message bot";
    botMessage.innerHTML = marked.parse(data.reply || "No response.");
    chatMessages.appendChild(botMessage);
  } catch (err) {
    typingIndicator.remove();

    const errorMsg = document.createElement("div");
    errorMsg.className = "message bot";
    errorMsg.textContent = "⚠️ There was an error connecting to the server.";
    chatMessages.appendChild(errorMsg);
  }

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Input behavior: auto-height & Enter key submit
messageInput.addEventListener("keydown", function (e) {
  this.style.height = "auto";
  this.style.height = Math.min(this.scrollHeight, 200) + "px";

  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
