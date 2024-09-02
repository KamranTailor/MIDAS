//utils/checkDatabase.js

import fs from 'fs/promises';
import setController from './setController.js';

export default async function checkDatabase(databaseId) {
    try {
        let controller = await setController();

        return controller.some(item => item.databaseId === databaseId);

    } catch (err) {
      console.error('Error reading or parsing the file:', err);
    }
}