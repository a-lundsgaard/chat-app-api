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
    setCookie: Response['cookie'];
    req: Request;
    res: Response;
    isMe: boolean = false;

    constructor(req: Request, res: Response) {
        this.setCookie = res.cookie;
        this.req = req;
        this.res = res;
    }

    verifyToken(): UserResponsObject | null {
        try {
            // let _CURRENT_TOKEN = this.getToken();

            // console.log("cookie obj: ", req.cookies);

            // const cookies = parse(this.req.headers.cookie || '');
            // const session = cookies.session || '';

            console.log("cookie obj: ", this.req.headers.cookie);

            const cookies = parseCookies({ req: this.req });
            const session = cookies["auth-token"] || '';

            console.log("session: ", cookies, session);


            // const { session } = this.req.cookies;
            if (!session) throw new JsonWebTokenError("Missing JWT Token");

            const { key, user } = jwt.verify(session, this._TOKEN_SECRET!) as JWTData;
            const isValidKey = bcrypt.compareSync(this._TOKEN_SECRET_VERIFICATION_KEY!, key);
            if (!isValidKey) {
                throw new GraphQLError(this._UNAUTHORIZED_USER_MESSAGE);
            }
            // this._TOKEN = this.setToken(null);

            // return isValidKey;
            console.log("isValid", isValidKey);
            return user;
        } catch (error) {
            throw error;
        }
    }

    // private setToken(token: string | null): string | null {
    //     this._TOKEN = token;
    //     return token;
    // }

    // private getToken(): string | null {
    //     return this._TOKEN;
    // }

    private signToken(user: UserResponsObject): string {
        const key = bcrypt.hashSync(this._TOKEN_SECRET_VERIFICATION_KEY!, 10);

        const obj: JWTData = {
            key: key,
            user: { ...user, isLoggedIn: true },
        };

        const token = jwt.sign({ data: obj }, this._TOKEN_SECRET!, {
            expiresIn: this._TOKEN_EXPIRATION,
        });

        // setCookie({ res }, 'session', token, {
        //     httpOnly: true,
        //     // secure: true, // Enable this if using HTTPS e.g. in production
        //     path: '/', // The path: '/' means that the cookie will be valid for the entire domain. It will be sent by the client to the server for any URL path within the domain.
        // });

        return token;

    }

    public initialize(req: Request, res: Response) {

        console.log("cookie obj: ", req.cookies);

        // const cookies = parse(req.cookies || '');
        // const loginToken = cookies.session || '';
        // console.log("loginToken", cookies);
        // this._TOKEN = this.setToken(loginToken || null);
        // this.cookie = res.cookie;

        // const cookie = res.cookie;
        // return this;
    }

    public signIn(user: UserResponsObject): string {
        return this.signToken(user);
    }

    public authenticate() {
        return this.verifyToken();
    }
}


export default ContextManager;
