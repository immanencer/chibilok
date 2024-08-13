import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { registerRoutes } from './routes.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3008;

// Convert import.meta.url to a file path equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'src' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Register routes
registerRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
