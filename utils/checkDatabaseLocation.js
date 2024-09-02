//utils/checkDatabaseLocation.js

import fs from 'fs/promises';
import setController from './setController.js';

export default async function checkDatabaseLocation(databaseId) {
    try {
        let controller = await setController();

        for (let i in controller) {
            if (controller[i].databaseId === databaseId) {
                return controller[i].fileName;
            }
        }

    } catch (err) {
      console.error('Error reading or parsing the file:', err);
    }
}