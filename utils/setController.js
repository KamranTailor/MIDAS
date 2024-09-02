//utils/setController.js

import fs from 'fs/promises';

export default async function setController() {
    try {
        const data = await fs.readFile('./controller/index.json', 'utf-8');
        return JSON.parse(data);  
    } catch (err) {
      console.error('Error reading or parsing the file:', err);
    }
}