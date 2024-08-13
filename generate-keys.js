import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name where the script is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the data directory exists
const dataDir = path.join(__dirname, './data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Define the file path for storing keys
const keysFilePath = path.join(dataDir, 'keys.json');

// Generate RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,  // Key size in bits
    publicKeyEncoding: {
        type: 'pkcs1',  // "Public Key Cryptography Standards 1"
        format: 'pem'   // Most common format for encoding keys
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
});

// Create an object to hold the keys
const keys = {
    publicKey,
    privateKey
};

// Write the keys to the JSON file
fs.writeFileSync(keysFilePath, JSON.stringify(keys, null, 2), 'utf8');

console.log(`Keys generated and saved to ${keysFilePath}`);
