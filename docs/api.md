# Chibiliok API Documentation

## Overview

The Chibiliok API allows users to interact with the decentralized communication platform. The main functionalities include public key registration, sending messages, and retrieving messages and public keys.

## Endpoints

### 1. `POST /register`

**Description:** Register a public key for a user.

**Request Body:**
```json
{
  "username": "string",
  "publicKey": "string"
}
```

**Response:**
- `200 OK` if the public key is registered successfully.
- `400 Bad Request` if the request is missing required fields.

### 2. `POST /message`

**Description:** Send a message to a specific channel.

**Request Body:**
```json
{
  "username": "string",
  "channel": "string",
  "message": "string"
}
```

**Response:**
- `200 OK` with the message details (including `hash` and `signature`).
- `400 Bad Request` if the request is missing required fields.

### 3. `GET /messages`

**Description:** Retrieve all messages from all channels.

**Response:**
- `200 OK` with an array of messages.

### 4. `GET /keys`

**Description:** Retrieve all known public keys.

**Response:**
- `200 OK` with an object containing all known public keys.

## Example Usage

### Registering a Public Key

```bash
curl -X POST http://localhost:3000/register \
-H "Content-Type: application/json" \
-d '{
  "username": "exampleUser",
  "publicKey": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkq..."
}'
```

### Sending a Message

```bash
curl -X POST http://localhost:3000/message \
-H "Content-Type: application/json" \
-d '{
  "username": "exampleUser",
  "channel": "general",
  "message": "Hello, world!"
}'
```

### Retrieving All Messages

```bash
curl http://localhost:3000/messages
```

### Retrieving All Known Public Keys

```bash
curl http://localhost:3000/keys
```
