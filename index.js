// index.js

const version = "V1";

import express from 'express';
import dotenv from 'dotenv';
import localUtils from './utils/main.js';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

dotenv.config();
const port = 9090;

import app from './main.js';

// Initialize periodic tasks
import { initializePeriodicTasks } from './dump/main.js';
initializePeriodicTasks();

// Initialize controller asynchronously
(async () => {
    let controller = await localUtils.setController();
})();

// Set version endpoint and static files
app.get('/version', (request, response) => {
    response.json({ version: version });
});
app.use(express.static('public'));

// Start server
app.listen(port, () => console.log(`Listening at port ${port}`));
