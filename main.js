//main.js

import express from 'express';
import bodyParser from 'body-parser';
import localUtils from './utils/main.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//Database Commands 
import addEntryRouter from './api/databaseEdit/addEntry.js';
app.use('/addEntry', localUtils.apiKeyMiddleware, addEntryRouter);

import deleteEntryRouter from './api/databaseEdit/deleteEntry.js';
app.use('/deleteEntry', localUtils.apiKeyMiddleware, deleteEntryRouter);

import editEntryRouter from './api/databaseEdit/editEntry.js';
app.use('/editEntry', localUtils.apiKeyMiddleware, editEntryRouter);

import getDatabaseRouter from './api/databaseEdit/getDatabase.js';
app.use('/getDatabase', localUtils.apiKeyMiddleware, getDatabaseRouter);

import dataCachingRouter from './api/dataCaching/setData.js';
app.use('/dataCaching/setData', localUtils.apiKeyMiddleware, dataCachingRouter);

//Web Commands 
app.use('/webAdminView/edit/*', localUtils.checkAccessToken);

import webRequestToken from "./api/webEditor/login/requestToken.js";
app.use('/webAdminView/login/requestToken', webRequestToken);

import webVerifyToken from "./api/webEditor/login/verifyToken.js";
app.use('/webAdminView/login/verifyToken', webVerifyToken);

import addDatabaseRouter from "./api/webEditor/edit/addDatabse.js";
app.use('/webAdminView/edit/addDatabase', addDatabaseRouter);

import getAllDatabaseRouter from "./api/webEditor/edit/getAllDatabase.js";
app.use('/webAdminView/edit/getAllDatabase', getAllDatabaseRouter);


export default app;