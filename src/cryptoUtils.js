import crypto from 'crypto';

export function generateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

export function generateKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
}
