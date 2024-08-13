import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botsDir = path.join(__dirname, '../bots');

export function loadBots() {
    const bots = [];

    // Read all files in the bots directory
    fs.readdirSync(botsDir).forEach(file => {
        if (file.endsWith('.js')) {
            // Dynamically import the bot module
            const botModule = import(path.join(botsDir, file));

            // Assuming each bot file exports a function named after the file (without extension)
            const botName = path.basename(file, '.js');
            
            // Push the bot function to the bots array
            bots.push({
                name: botName,
                execute: botModule[botName]
            });
        }
    });

    return bots;
}
