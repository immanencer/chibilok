### Chibiliok: Decentralized Communication Platform

#### Overview
Chibiliok is a decentralized, easy-to-run communication platform designed for secure messaging, public key registration, and bot support. It’s an ideal solution for privacy-conscious communities and developers who want to extend functionality with JavaScript bots.

### Key Features

1. **Cosychain Message Format:**
   - **Structure:** Messages are formatted as `[prev_hash]timestamp(channel)message[signature]`.
   - **Integrity & Security:** Each message is cryptographically linked to the previous one using a hash, ensuring that the entire chat history remains tamper-proof.
   - **UTF-8 Support:** Full support for UTF-8 encoding, including emojis and special characters.

2. **Public Key Registration & Management:**
   - **Decentralized Nodes:** Users run a local Node.js instance to manage their keys and participate in the network.
   - **Key Publishing:** Users publish their public keys during registration, which are used to verify their identity.
   - **Key Management:** Users can manage known keys (e.g., friends or trusted nodes), allowing for secure communication across the network.

3. **Message Encryption:**
   - **Private Channels:** Messages in private channels are encrypted using the node’s private key, ensuring that only authorized participants can read them.
   - **Public Channels:** Messages in public channels are not encrypted but maintain integrity through the Cosychain format.

4. **Decentralization & Local Hosting:**
   - **Local Node Setup:** Chibiliok is designed to be easily hosted on a user’s local machine. Each user operates their own node, contributing to a decentralized network without relying on a central server.
   - **Scalability:** The system can scale as more nodes join the network, with each node managing its own data.

5. **Bot-Friendly Design:**
   - **JavaScript Bot Support:** Users can easily extend the platform by forking the provided repository and writing their own bots in JavaScript.
   - **Developer-Friendly:** The repository includes documentation and examples to help users get started with bot development quickly.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/immanencer/chibiliok.git
   cd chibiliok
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Generate Keys:**
   ```bash
   node generate-keys.js
   ```
   This script will generate your public and private keys and store them locally.

4. **Start Your Node:**
   ```bash
   npm start
   ```
   This will launch your local node, which will handle all messaging, key management, and bot operations.

5. **Fork and Customize Bots (Optional):**
   - Fork the repository and navigate to the `bots` directory.
   - Create or customize bots using JavaScript. Examples are provided in the `examples` directory.
   - Deploy your bot by adding it to the `bots` directory and restarting your node.

### Usage

- **Public Channels:** Messages are visible to everyone in the channel and are unencrypted.
- **Private Channels:** Messages are encrypted and can only be decrypted by users with the appropriate keys.
- **Bot Development:** Customize bots by forking the repository and writing your own JavaScript code. The platform provides APIs for bot interaction.

### Contributing

Contributions are welcome! Please submit a pull request or open an issue for any bugs or feature requests.

### License

This project is licensed under the MIT License.

---

This revised README outlines the Chibiliok platform without mentioning other platforms, focusing on the core features and instructions for users and developers. Would you like any further adjustments?