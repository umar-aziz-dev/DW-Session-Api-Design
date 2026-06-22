// Auth Simple middleware

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Assuming Bearer token

    //  Decode Token and verify to pass
    if (token !== 'your-secret-token') {
        return res.status(403).json({ message: 'Invalid token' });
    }

    next();
};

export default authMiddleware;