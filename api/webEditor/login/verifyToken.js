//api/webEditor/login/verifyToken.js

import express from 'express';
import fs from 'fs/promises';
import localUtils from '../../../utils/main.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { localAccsessToken, serverAccsessToken } = request.body;

        // Read the keys from the JSON file
        const keysRes = await fs.readFile('./database/web/keys.json', 'utf-8');
        const keys = JSON.parse(keysRes);

        // Ensure the incoming tokens are strings
        if (typeof localAccsessToken !== 'string' || typeof serverAccsessToken !== 'string') {
            return response.status(400).json({ status: false, message: 'Invalid token format' });
        }

        // Iterate over each key to find a match
        for (let i in keys) {

            // Ensure the key properties are strings
            if (typeof keys[i].serverAccsessToken === 'string' && typeof keys[i].localAccsessToken === 'string') {
                if (keys[i].serverAccsessToken === serverAccsessToken && keys[i].localAccsessToken === localAccsessToken) {
                    return response.status(200).json({ status: true, message: 'Tokens match exactly' });
                }
            } else {
                console.log(`Invalid key format at index ${i}`);
            }
        }
        
        return response.status(401).json({ status: false, message: 'Tokens do not match exactly' });

    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;