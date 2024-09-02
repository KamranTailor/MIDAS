// utils/main.js

import printMessage from './printMessage.js';
import setController from './setController.js';
import checkDatabase from './checkDatabase.js';
import checkDatabaseLocation from './checkDatabaseLocation.js';
import apiKeyMiddleware from './apiKeyMiddleware.js';
import checkAccessToken from './checkAccessToken.js';

// Named exports
export { printMessage, setController, checkDatabase, checkDatabaseLocation,
    apiKeyMiddleware, checkAccessToken
 };

// Default export as an object
export default {
    printMessage,
    setController,
    checkDatabase, 
    checkDatabaseLocation,
    apiKeyMiddleware,
    checkAccessToken
};
