import dotenv from "dotenv";
dotenv.config();
import { JsonWebTokenError } from "jsonwebtoken";
import { GraphQLError } from 'graphql';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { parse } from 'cookie';
import { UserLoginResponse } from "../generated/graphql";


import { Request } from 'express';


let _TOKEN: string | null = null;
const _TOKEN_SECRET: string | undefined = process.env.JWT_SECRET;
const _TOKEN_SECRET_VERIFICATION_KEY: string | undefined = process.env.JWT_SECRET_VERIFICATION_KEY;
const _TOKEN_EXPIRATION: string | undefined = process.env.JWT_TOKEN_EXPIRATION || "1d";
const _UNAUTHORIZED_USER_MESSAGE = "Invalid Key";

const verifyToken = (): boolean => {
    try {
        let _CURRENT_TOKEN = getToken();
        if (!_CURRENT_TOKEN) throw new JsonWebTokenError("Missing JWT Token");
        const { key } = jwt.verify(_CURRENT_TOKEN, _TOKEN_SECRET!) as { key: string };
        const isValidKey = bcrypt.compareSync(
            _TOKEN_SECRET_VERIFICATION_KEY!,
            key
        );
        if (!isValidKey) {
            throw new GraphQLError(_UNAUTHORIZED_USER_MESSAGE);
        }
        _TOKEN = setToken(null);
        return isValidKey;
    } catch (error) {
        throw error;
    }
};

const setToken = (token: string | null): string | null => {
    _TOKEN = token;
    return token;
};

const getToken = (): string | null => {
    return _TOKEN;
};

const signToken = (user: UserLoginResponse): string => {
    const key = bcrypt.hashSync(_TOKEN_SECRET_VERIFICATION_KEY!, 10);
    return jwt.sign({ key: key }, _TOKEN_SECRET!, {
        expiresIn: _TOKEN_EXPIRATION,
    });
};

export default (req: Request) => {

    const cookies = parse(req.headers.cookie || ''); // parse http only cookie
    const loginToken = cookies.loginToken || ''; // set the cookie in the frontend :   context.res.setHeader('Set-Cookie', serialize('loginToken', loginToken, {
    // _TOKEN = setToken(req.headers && req.headers.authorization || null);
    _TOKEN = setToken(loginToken || null);

    return { signIn: signToken, authenticate: verifyToken };
};
