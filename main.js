//main.js

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import addEntryRouter from './api/databaseEdit/addEntry.js';
app.use('/addEntry', addEntryRouter);

import deleteEntryRouter from './api/databaseEdit/deleteEntry.js';
app.use('/deleteEntry', deleteEntryRouter);

export default app;