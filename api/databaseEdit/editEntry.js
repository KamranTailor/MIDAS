// editArray.js

import express from 'express';
import fs from 'fs/promises';
import localUtils from '../../utils/main.js';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { databaseId, entryId, newArray } = request.body;

        if (localUtils.checkDatabase(databaseId)) {
            try {
                const location = await localUtils.checkDatabaseLocation(databaseId);
                const filePath = `./database/${location}`;

                const fileContent = await fs.readFile(filePath, 'utf-8');
                let data = JSON.parse(fileContent);

                if (!Array.isArray(data)) {
                    return response.status(500).json({ status: false, message: 'Database file format is invalid' });
                }

                let entryFound = false;

                // Find and update the entry
                for (let i in data) {
                    if (data[i].id === entryId) {
                        const id = data[i].id;
                        data[i] = newArray;
                        data[i].id = id; // Keep the original ID
                        entryFound = true;
                        break;
                    }
                }

                // If the entryId was not found, return an error
                if (!entryFound) {
                    return response.status(404).json({ status: false, message: 'Entry ID not found' });
                }

                // Write the updated data back to the file
                await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

                response.json({ status: true, data: data, newArray });
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

