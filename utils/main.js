// utils/main.js

import printMessage from './printMessage.js';
import setController from './setController.js';
import checkDatabase from './checkDatabase.js';
import checkDatabaseLocation from './checkDatabaseLocation.js';
import apiKeyMiddleware from './apiKeyMiddleware.js';
import checkAccessToken from './checkAccessToken.js';
import generate4DigitCode from './generate4DigitCode.js';
import sendEmail from './sendEmail.js';

// Named exports
export { printMessage, setController, checkDatabase, checkDatabaseLocation,
    apiKeyMiddleware, checkAccessToken, generate4DigitCode, sendEmail };

// Default export as an object
export default {
    printMessage,
    setController,
    checkDatabase, 
    checkDatabaseLocation,
    apiKeyMiddleware,
    checkAccessToken,
    generate4DigitCode, 
    sendEmail
};
