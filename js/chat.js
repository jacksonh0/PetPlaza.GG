document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.querySelector('.chat-messages');
  const chatInput = document.querySelector('.chat-input input');
  const chatSend = document.querySelector('.chat-input button');

  const appendMessage = (message, sender) => {
    // Create a chat bubble
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble', sender);
    bubble.innerHTML = `<div class="name">${sender === 'bot' ? 'Bot' : 'You'}</div>${message}`;

    // Append to messages container
    chatMessages.appendChild(bubble);

    // Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      // Append user message
      appendMessage(message, 'user');

      // Simulate bot response
      setTimeout(() => {
        appendMessage('Hello! How can I help you?', 'bot');
      }, 1000);

      // Clear input field
      chatInput.value = '';
    }
  });
});
