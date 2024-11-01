// index.js

const version = "V1";

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import localUtils from './utils/main.js';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

dotenv.config();
const port =  9090;
import app from './main.js';

import { initializePeriodicTasks } from './dump/main.js'; 
initializePeriodicTasks();

let controller = await localUtils.setController();

app.use(express.json({ limit: '10mb' })); // for JSON payloads
app.use(express.urlencoded({ limit: '10mb', extended: true })); // for URL-encoded payloads

app.get('/version', (request, response) => {response.json({version: version})});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(port, () => console.log(`Listening at port ${port}`));