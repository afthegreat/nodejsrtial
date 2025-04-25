import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ message: 'Invalid authorization header format' });
    }
    console.log('JWT_SECRET during verify:', process.env.JWT_SECRET);
    console.log('Received token:', token);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.userId = decoded.id;
        next();
    });
}

export default authMiddleware;
