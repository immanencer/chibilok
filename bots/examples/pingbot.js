export function pingBot(message, sendMessage) {
    if (message.toLowerCase() === 'ping') {
        sendMessage('Pong');
    }
}
