//main.js

import express from 'express';
import bodyParser from 'body-parser';
import localUtils from './utils/main.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database Commands 
import addEntryRouter from './api/databaseEdit/addEntry.js';
app.use('/addEntry', localUtils.apiKeyMiddleware, addEntryRouter);

import deleteEntryRouter from './api/databaseEdit/deleteEntry.js';
app.use('/deleteEntry', localUtils.apiKeyMiddleware, deleteEntryRouter);

//Web Commands 
app.use('/webAdminView/edit/*', localUtils.checkAccessToken);

import webRequestToken from "./api/webEditor/login/requestToken";
app.use('/webAdminView/login/requestToken', webRequestToken);

import webVerifyToken from "./api/webEditor/login/verifyToken";
app.use('/webAdminView/login/verifyToken', webVerifyToken);


export default app;