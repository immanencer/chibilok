import request from 'supertest';
import { expect } from 'chai';
import app from '../src/index.js'; // Adjust the path as necessary

describe('Chibiliok API Tests', () => {
    it('should register a public key', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                username: 'testuser',
                publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBg...'
            });

        expect(res.statusCode).to.equal(200);
        expect(res.text).to.equal('Public key registered successfully.');
    });

    it('should send a message', async () => {
        const res = await request(app)
            .post('/message')
            .send({
                username: 'testuser',
                channel: 'general',
                message: 'Hello, Chibiliok!'
            });

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('hash');
        expect(res.body).to.have.property('signature');
    });

    it('should retrieve all messages', async () => {
        const res = await request(app).get('/messages');

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
    });

    it('should retrieve all known public keys', async () => {
        const res = await request(app).get('/keys');

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('testuser');
    });
});
