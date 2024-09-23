import express from 'express';
import fs from 'fs/promises';
import path from 'path';  // Import path to handle file paths
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const controllerFilePath = './controller/index.json';

router.get('/', async (request, response) => {
    try {
        const data = await fs.readFile(controllerFilePath, 'utf8');
        const databases = JSON.parse(data);

        response.json({ success: true, databases: databases });
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
