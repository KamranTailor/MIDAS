import fs from 'fs/promises';

export default async function checkAccessTokens(req, res, next) {
    const localAccessToken = req.headers['local-access-token'];
    const serverAccessToken = req.headers['server-access-token'];

    console.log(localAccessToken, serverAccessToken)
    // Check if the tokens are present
    if (!localAccessToken || !serverAccessToken) {
        return res.status(401).json({ message: 'Unauthorized: Missing tokens' });
    }

    // Ensure the incoming tokens are strings
    if (typeof localAccessToken !== 'string' || typeof serverAccessToken !== 'string') {
        return res.status(400).json({ status: false, message: 'Invalid token format' });
    }

    try {
        // Read the keys from the JSON file
        const keysRes = await fs.readFile('./database/web/keys.json', 'utf-8');
        const keys = JSON.parse(keysRes);

        // Iterate over each key to find a match
        for (let i in keys) {
            const key = keys[i];

            // Ensure the key properties are strings
            if (typeof key.serverAccsessToken === 'string' && typeof key.localAccsessToken === 'string') {
                if (key.serverAccsessToken === serverAccessToken && key.localAccsessToken === localAccessToken) {
                    return next(); // Call next() and return to avoid further processing
                }
            } else {
                //console.log(`Invalid key format at index ${i}`);
            }
        }

        // If no match was found
        return res.status(401).json({ message: 'Unauthorized: Invalid tokens' });

    } catch (error) {
        console.error('Error reading keys file:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
