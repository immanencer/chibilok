import { sendMessage, getMessages } from './api.js';
import { renderMessage } from './components.js';

let user = {
    nickname: '',
    privateKey: ''
};

document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const messagesContainer = document.getElementById('messages');
    const nicknameInput = document.getElementById('nicknameInput');
    const generateKeyButton = document.getElementById('generateKeyButton');
    const privateKeyDisplay = document.getElementById('privateKeyDisplay');
    const registerButton = document.getElementById('registerButton');
    const registrationModal = document.getElementById('registrationModal');

    // Generate Private Key
    generateKeyButton.addEventListener('click', () => {
        user.privateKey = generatePrivateKey();
        privateKeyDisplay.textContent = user.privateKey;
    });

    // Register User
    registerButton.addEventListener('click', () => {
        const nickname = nicknameInput.value.trim();
        if (nickname && user.privateKey) {
            user.nickname = nickname;
            registrationModal.style.display = 'none';
        } else {
            alert('Please enter a nickname and generate a private key.');
        }
    });

    // Send message on button click or Enter keypress
    sendButton.addEventListener('click', sendMessageHandler);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessageHandler();
        }
    });

    async function sendMessageHandler() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const newMessage = await sendMessage(user.nickname, 'general', messageText, user.privateKey);
            renderMessage(messagesContainer, newMessage);
            messageInput.value = ''; // Clear input
        }
    }

    async function loadMessages() {
        const messages = await getMessages();
        messagesContainer.innerHTML = ''; // Clear existing messages before reloading
        messages.forEach(message => {
            renderMessage(messagesContainer, message);
        });
    }

    setInterval(loadMessages, 5000); // Automatically fetch messages every 5 seconds
});

function generatePrivateKey() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => ('0' + byte.toString(16)).slice(-2)).join('');
}
