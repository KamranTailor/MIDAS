// setData.js

import express from 'express';
import fs from 'fs/promises';
import localUtils from '../../utils/main.js';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { databaseId, newData } = request.body;

        // Ensure newData is a valid object

        // Check if the database exists
        if (localUtils.checkDatabase(databaseId)) {
            try {
                // Get the file location of the database
                const location = await localUtils.checkDatabaseLocation(databaseId);
                const filePath = `./database/${location}`;

                // Write the updated data back to the file
                await fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf-8');
                response.json({ status: true, message: 'Data successfully added' });

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