document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.querySelector('.chat-messages');
  const chatInput = document.querySelector('.chat-input input');
  const chatSend = document.querySelector('.chat-input button');

  chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      // Display the user's message
      const userMessage = document.createElement('div');
      userMessage.textContent = `You: ${message}`;
      chatMessages.appendChild(userMessage);

      // Simulate bot response
      setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.textContent = `Bot: Hello! How can I help you?`;
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);

      chatInput.value = '';
    }
  });
});
