import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET not found in the .env file');
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.status(403).json({ error: 'No token provided' });
    }

    const token = authHeader!.startsWith('Bearer ') ? authHeader!.slice(7) : authHeader;

    jwt.verify(token!, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Failed to verify token' });
            return;
        }
        (req as any).user = decoded;
        (req as any).userId = (decoded as any).id;

        next();
    });
}

export default authMiddleware;