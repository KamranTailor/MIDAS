// addArray.js

import express from 'express';
import fs from 'fs/promises';
import localUtils from '../../utils/main.js';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { databaseId, newArray } = request.body;
        if (typeof newArray !== 'object' || newArray === null || Array.isArray(newArray)) {
            return response.status(400).json({ status: false, message: 'newArray must be an object' });
        }

        if (localUtils.checkDatabase(databaseId)) {
            try {
                const location = await localUtils.checkDatabaseLocation(databaseId);
                const filePath = `./database/${location}`;
                const fileContent = await fs.readFile(filePath, 'utf-8');
                const data = JSON.parse(fileContent);

                if (!Array.isArray(data)) {
                    return response.status(500).json({ status: false, message: 'Database file format is invalid' });
                }

                newArray.id = uuidv4();
                data.push(newArray);

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
