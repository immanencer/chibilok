export async function sendMessage(username, channel, message, privateKey) {
    const response = await fetch('/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, channel, message, privateKey }),
    });

    return response.json();
}

export async function getMessages() {
    const response = await fetch('/messages');
    return response.json();
}
