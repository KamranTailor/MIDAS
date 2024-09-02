// index.js

const version = "V1";

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import localUtils from './utils/main.js';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const port =  9090;
import app from './main.js';


let controller = await localUtils.setController();

app.get('/version', (request, response) => {response.json({version: version})});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(port, () => console.log(`Listening at port ${port}`));