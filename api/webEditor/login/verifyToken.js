//api/webEditor/login/verifyToken.js

import express from 'express';
import fs from 'fs/promises';
import localUtils from '../../../utils/main.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { localAccsessToken, token } = request.body;

        //Get database/web/keys.json
        //If localAccsessToken and the ServerToek mach return status as true
        //ELSE: Return status=false
        
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});

export default router;