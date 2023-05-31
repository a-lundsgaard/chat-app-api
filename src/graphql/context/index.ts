import dotenv from "dotenv";
dotenv.config();
import { JsonWebTokenError } from "jsonwebtoken";
import { GraphQLError } from 'graphql';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
// import { parse } from 'cookie';

import { User, UserResponsObject } from "../generated/graphql";
import { Request, Response, CookieOptions, } from 'express';
// import { setCookie } from 'nookies';
import { parseCookies } from 'nookies';


interface JWTData {
    key: string;
    user: UserResponsObject;
}




export class ContextManager {
    private _TOKEN: string | null = null;
    private readonly _TOKEN_SECRET: string | undefined = process.env.JWT_SECRET;
    private readonly _TOKEN_SECRET_VERIFICATION_KEY: string | undefined = process.env.JWT_SECRET_VERIFICATION_KEY;
    private readonly _TOKEN_EXPIRATION: string | undefined = process.env.JWT_TOKEN_EXPIRATION || "1d";
    private readonly _UNAUTHORIZED_USER_MESSAGE = "Invalid Key";
    // cookie: any ;
    // set type to cookie helper
    // setCookie: Response['cookie'];
    req?: Request;
    // res: Response;
    isMe: boolean = false;

    constructor(req?: Request) {
        // this.setCookie = res.cookie;
        this.req = req;
        // this.res = res;
    }

    verifyToken(token?: string): UserResponsObject | null {
        try {
            // if (!this.req || !token) throw new Error("from ctx manager Missing token or request object");
            console.log("Å CTX: ", this.req, token);
            const session = token ? token : (this.req?.headers['auth-token'] || '') as string
            if (!session) throw new JsonWebTokenError("Missing JWT Token");

            const { user, key } = jwt.verify(session, this._TOKEN_SECRET!) as JWTData;

            console.log("å user: ", user);
            const isValidKey = bcrypt.compareSync(this._TOKEN_SECRET_VERIFICATION_KEY!, key);

            if (!isValidKey) {
                throw new GraphQLError(this._UNAUTHORIZED_USER_MESSAGE);
            }
            return user;
        } catch (error: unknown) {
            console.error("error: ", error);
            throw new GraphQLError((error as Error).message);
        }
    }

    private signToken(user: UserResponsObject): string {
        const key = bcrypt.hashSync(this._TOKEN_SECRET_VERIFICATION_KEY!, 10);
        const obj: JWTData = {
            key: key,
            user: { ...user, isLoggedIn: true },
        };

        const token = jwt.sign(obj, this._TOKEN_SECRET!, {
            expiresIn: this._TOKEN_EXPIRATION,
        });
        return token;

    }

    public signIn(user: UserResponsObject): string {
        return this.signToken(user);
    }

    public authenticate() {
        return this.verifyToken();
    }
}


export default ContextManager;
