import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../graphql/generated/graphql';

interface MyRequest extends Request {
    user?: JwtPayload;
}

interface UserContext {
    user: User;
    userId: string;
}

const secret_key = process.env.JWT_SECRET as string;

export const getUser = (token: string) => {
    // const decodedToken = jwt.verify(token, 'secret_key') as User;

    if (token) {
        try {
            const decodedToken = jwt.verify(token, secret_key) as User;
            return decodedToken;

        } catch (err) {
            // res.status(401).json({ error: 'Invalid token' });
            return null;
        }
    } else {
        // res.status(401).json({ error: 'Authorization token not provided' });
        return null;
    }

};


const authMiddleware = async (req: MyRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, secret_key) as JwtPayload;
            req.user = decodedToken;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    } else {
        res.status(401).json({ error: 'Authorization token not provided' });
    }
};

export default authMiddleware;