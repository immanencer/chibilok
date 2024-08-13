import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { generateHash } from './cryptoUtils.js';
import { getPrivateKey } from './keyManager.js';

const messagesPath = path.join('./data', 'messages.json');

let messages = [];

export function loadMessages() {
    if (fs.existsSync(messagesPath)) {
        messages = JSON.parse(fs.readFileSync(messagesPath));
    } else {
        fs.writeFileSync(messagesPath, JSON.stringify(messages));
    }
}

export function saveMessage(message) {
    messages.push(message);
    fs.writeFileSync(messagesPath, JSON.stringify(messages));
}

export function getMessages() {
    return messages;
}

export function createMessage(username, channel, messageText, profilePic = "./uploads/default.png") {
    const timestamp = new Date().toISOString();
    const prevHash = messages.length ? messages[messages.length - 1].hash : '';
    const message = {
        prevHash,
        timestamp,
        channel,
        username,
        message: messageText,
        profilePic,  // Include the profile picture URL
    };

    message.hash = generateHash(`${prevHash}${timestamp}${channel}${messageText}`);
    message.signature = crypto.sign("sha256", Buffer.from(message.hash), {
        key: getPrivateKey(),
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    }).toString('base64');

    saveMessage(message);
    return message;
}
