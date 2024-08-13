export function renderMessage(container, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    const content = document.createElement('div');
    content.classList.add('message-content');
    content.innerHTML = `<strong>${message.username}:</strong> ${message.message} <br><small>${message.timestamp}</small>`;

    messageElement.appendChild(content);

    container.appendChild(messageElement);
}
