import fs from 'fs';
import path from 'path';

const DATA_DIR = './data';
const keysPath = path.join(DATA_DIR, 'keys.json');
const knownKeysPath = path.join(DATA_DIR, 'known_keys.json');

let keys;
let knownKeys = {};

export function loadKeys() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR);
    }

    if (fs.existsSync(keysPath)) {
        keys = JSON.parse(fs.readFileSync(keysPath));
    } else {
        throw new Error('Keys not found. Please generate keys.');
    }

    if (fs.existsSync(knownKeysPath)) {
        knownKeys = JSON.parse(fs.readFileSync(knownKeysPath));
    } else {
        fs.writeFileSync(knownKeysPath, JSON.stringify(knownKeys));
    }
}

export function saveKeys(newKeys) {
    keys = newKeys;
    fs.writeFileSync(keysPath, JSON.stringify(keys));
}

export function getPublicKey(username) {
    return knownKeys[username];
}

export function registerPublicKey(username, publicKey) {
    knownKeys[username] = publicKey;
    fs.writeFileSync(knownKeysPath, JSON.stringify(knownKeys));
}

export function getPrivateKey() {
    return keys.privateKey;
}

export function getAllKnownKeys() {
    return knownKeys;
}

loadKeys();