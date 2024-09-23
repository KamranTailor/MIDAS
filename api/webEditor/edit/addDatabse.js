import express from 'express';
import fs from 'fs/promises';
import path from 'path';  // Import path to handle file paths
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const controllerFilePath = './controller/index.json';

router.post('/', async (request, response) => {
    try {
        const filePath = request.body.name;  // Extracted file path from the request body
        const fullPath = path.join('./database', filePath);  // Construct the full path

        // Extract the directory from the path
        const dir = path.dirname(fullPath);
        const fileName = path.basename(filePath, '.json');  // Get the file name without extension

        // Check if directory exists, if not, create it
        await fs.mkdir(dir, { recursive: true });

        // Write an empty array to the new file
        await fs.writeFile(fullPath, '[]');

        // Load the existing databases from the controller file
        let databases = [];
        try {
            const data = await fs.readFile(controllerFilePath, 'utf8');
            databases = JSON.parse(data);
        } catch (err) {
            console.error('Error reading the controller file:', err);
        }

        // Add the new database entry
        const newDatabase = {
            databaseName: fileName,  // Assuming the database name is the file name without extension
            databaseId: uuidv4(),    // Generate a unique ID for the database
            fileName: filePath       // Store the full relative path to the file
        };
        databases.push(newDatabase);

        // Write the updated database list back to the controller file
        await fs.writeFile(controllerFilePath, JSON.stringify(databases, null, 2));  // Pretty-print JSON

        response.json({ success: true, databaseId: newDatabase.databaseId  });
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;
