// getDatabase.js

import express from 'express';
import fs from 'fs/promises';
import localUtils from '../../utils/main.js';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { databaseId } = request.body;

        //console.log(databaseId);
        if (localUtils.checkDatabase(databaseId)) {
            try {
                const location = await localUtils.checkDatabaseLocation(databaseId);
                const filePath = `./database/${location}`;

                const fileContent = await fs.readFile(filePath, 'utf-8');
                let data = JSON.parse(fileContent);

                response.json({ status: true, data : data});
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
