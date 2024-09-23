//utils/apiKeyMiddleware.js

import dotenv from 'dotenv';
dotenv.config();

export default function apiKeyMiddleware(req, res, next) {
    const apiKey = req.query.api_key;
    if (apiKey === process.env.API_KEY) {
        next(); // API key is valid, proceed to the route handler
    } else {
        res.status(403).json({ error: 'Forbidden: Invalid API Key' });
    }
}