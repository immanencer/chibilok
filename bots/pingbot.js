export function pingbot(message, sendMessage) {
    if (message.toLowerCase() === 'ping') {
        sendMessage('pong');
    }
}
