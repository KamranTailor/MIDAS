// deleteEntry.js

import express from 'express';
import fs from 'fs/promises';
import localUtils from '../../utils/main.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { databaseId, entryId } = request.body;

        if (!entryId) {
            return response.status(400).json({ status: false, message: 'Entry ID is required' });
        }

        // Check if the database is valid
        if (localUtils.checkDatabase(databaseId)) {
            try {
                const location = await localUtils.checkDatabaseLocation(databaseId);
                const filePath = `./database/${location}`;

                const fileContent = await fs.readFile(filePath, 'utf-8');
                let data = JSON.parse(fileContent);

                if (!Array.isArray(data)) {
                    return response.status(500).json({ status: false, message: 'Database file format is invalid' });
                }

                data = data.filter(item => item.id !== entryId);

                await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

                response.json({ status: true });
            } catch (error) {
                console.error('Error reading or writing file:', error);
                response.status(500).json({ status: false, message: 'Internal server error' });
            }
        } else {
            response.status(400).json({ status: false, message: 'Invalid database ID' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
