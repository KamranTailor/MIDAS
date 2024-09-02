//utils/checkAccessToken

export default async function checkAccessTokens(req, res, next) {
    const localAccessToken = req.headers['localaccesstoken'];
    const serverAccessToken = req.headers['serveraccesstoken'];

    if (!localAccessToken || !serverAccessToken) {
        return res.status(401).json({ message: 'Unauthorized: Missing tokens' });
    }
    
    next();
}