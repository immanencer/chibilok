import { registerPublicKey, getPublicKey, getAllKnownKeys } from './keyManager.js';
import { createMessage, getMessages } from './messageHandler.js';
import { loadBots } from './botLoader.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads')); // Upload directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage: storage });

export function registerRoutes(app) {
    // Register public key
    app.post('/register', (req, res) => {
        const { username, publicKey } = req.body;
        if (username && publicKey) {
            registerPublicKey(username, publicKey);
            res.status(200).send('Public key registered successfully.');
        } else {
            res.status(400).send('Username and public key are required.');
        }
    });

    const bots = loadBots();  // Load all bots

    app.post('/message', (req, res) => {
        const { username, channel, message, privateKey } = req.body;

        if (!username || !channel || !message || !privateKey) {
            return res.status(400).send('Username, channel, message, and private key are required.');
        }

        // Here you could validate the private key, ensure it is unique, etc.

        const newMessage = createMessage(username, channel, message);

        bots.forEach(bot => {
            bot.execute(message, (response) => {
                if (response) {
                    const botMessage = createMessage(bot.name, channel, response);
                    res.status(200).json(botMessage);
                }
            });
        });

        res.status(200).json(newMessage);
    });

    // Get all messages
    app.get('/messages', (req, res) => {
        const messages = getMessages();
        res.status(200).json(messages);
    });


    // Image upload route
    app.post('/upload', upload.single('profilePic'), (req, res) => {
        if (req.file) {
            // Send back the URL of the uploaded image
            const imageUrl = `/uploads/${req.file.filename}`;
            res.status(200).json({ imageUrl });
        } else {
            res.status(400).send('Image upload failed.');
        }
    });

    // Get all known public keys
    app.get('/keys', (req, res) => {
        const keys = getAllKnownKeys();
        res.status(200).json(keys);
    });
}
