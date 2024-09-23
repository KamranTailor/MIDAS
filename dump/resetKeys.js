// dump/resetKeys.js

import fs from 'fs/promises'; // Ensure to import fs

export async function resetKeys() {
    try {
        // Read and parse the keys from the file
        const keysRes = await fs.readFile('./database/web/keys.json', 'utf-8');
        const keys = JSON.parse(keysRes);

        // Get the current time
        const now = Date.now();

        // Filter out keys older than 10 minutes
        const updatedKeys = keys.filter(key => {
            // Assume the key object has a timestamp property with milliseconds since epoch
            return now - key.timestamp <= 10 * 60 * 1000; // 10 minutes in milliseconds
        });

        // Write the updated keys back to the file
        await fs.writeFile('./database/web/keys.json', JSON.stringify(updatedKeys, null, 2), 'utf-8');
        
    } catch (error) {
        console.error('Error running periodic task:', error);
    }
}

export function startResetKeys() {
    resetKeys(); // Run the task initially
    setInterval(resetKeys, 10 * 60 * 1000); // 10 minutes in milliseconds
}
