const chatBox = document.getElementById("chatBox");

function toggleChat() {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
}

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

  const res = await fetch("https://abdul-wali.app.n8n.cloud/webhook/c0423075-9067-4e31-b2a1-c32c0e4a3ac8", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  typingIndicator.remove();
  const formattedReply = marked.parse(data.reply);
  chatMessages.innerHTML += `<div class="message bot">${formattedReply}</div>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const messageInput = document.getElementById("messageInput");

messageInput.addEventListener("keydown", function (e) {
  // Reset height to shrink when content is deleted
  this.style.height = "auto";

  // Expand up to max-height (200px)
  const maxHeight = 200;
  const newHeight = Math.min(this.scrollHeight, maxHeight);
  this.style.height = `${newHeight}px`;

  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
