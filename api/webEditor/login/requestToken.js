//api/webEditor/login/requestToken.js

import express from 'express';
import fs from 'fs/promises';
import localUtils from '../../../utils/main.js'; 

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const { email } = request.body;

        //Get database/web/authUsers.json
        //Check if email is in file
        //IF: Email passkey, add passkey and localAccsessToken to database/web/keys.json
        //Return status=true; Return Email Sent to; return and gen localAccsessToken.json
        //ELSE: Return status=false

    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({ status: false, message: 'Internal server error' });
    }
});


export default router;