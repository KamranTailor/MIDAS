//api/webEditor/login/requestToken.js

import express from 'express';
import fs from 'fs/promises';
import localUtils from '../../../utils/main.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { email } = request.body;

        // Read users and keys data
        const authUsersRes = await fs.readFile('./database/web/authUsers.json', 'utf-8');
        const authUsers = JSON.parse(authUsersRes);

        // Check if user with provided email exists
        const user = authUsers.find(user => user.email === email);

        if (user) {
            const serverAccsessToken = localUtils.generate4DigitCode();
            const localAccsessToken = uuidv4();

            // Read and update keys data
            const keysRes = await fs.readFile('./database/web/keys.json', 'utf-8');
            const keys = JSON.parse(keysRes);

            const timestamp = Date.now();

            keys.push({
                email,
                serverAccsessToken,
                localAccsessToken,
                timestamp
            });

            await fs.writeFile('./database/web/keys.json', JSON.stringify(keys, null, 2), 'utf-8');

            const content = `Your OTP is: ${serverAccsessToken}`;
            await localUtils.sendEmail(email, "Your OTP", content);

            response.json({ status: true, email, localAccsessToken });
        } else {
            response.status(404).json({ status: false, message: 'Email not found' });
        }

    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});


export default router;