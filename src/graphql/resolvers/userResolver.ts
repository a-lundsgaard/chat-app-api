import UserController from "../../database/controllers/userController"
import { Resolvers } from "../generated/graphql";
import bcrypt from 'bcrypt';
import { setCookie, parseCookies } from 'nookies';
import { Request } from "express";
import nookies from 'nookies'

// import { parseCookies, setCookie } from 'nookies';


const uc = new UserController();

const userResolver: Resolvers = {
    Mutation: {
        async registerUser(_, { input }) {
            return await uc.registerUser(input);
        },

        async login(_, { input }, context) {
            const { email, password } = input;
            let loginSuccess = false;
            try {
                const user = await uc.find(email);
                if (user) {
                    if (await bcrypt.compare(password, user.password)) {
                        loginSuccess = true;
                    }
                } else throw new Error('User not found');

                if (loginSuccess) {
                    const responseObj = {
                        username: user.username,
                        email: user.email
                    }
                    const token = context.signIn(responseObj);

                    context.res.setHeader('my_token', token);

                    console.log('token: ', token);

                    // console.log('setting token: ', token);

                    // const token = "123";



                    // const cookie = setCookie(null, 'session', token, {
                    //     httpOnly: true,
                    //     // secure: true, // Enable this if using HTTPS e.g. in production
                    //     path: '/', // The path: '/' means that the cookie will be valid for the entire domain. It will be sent by the client to the server for any URL path within the domain.
                    // });

                    // console.log('cookie: ', cookie);
                    // const cookie = context.cookie!;
                    // const { setCookie } = context;
                    // setCookie('session', "123", {
                    //     httpOnly: true,
                    //     // secure: true, // Enable this if using HTTPS e.g. in production
                    //     path: '/', // The path: '/' means that the cookie will be valid for the entire domain. It will be sent by the client to the server for any URL path within the domain.
                    // });

                    const te = context.res

                    // context.res
                    //     .writeHead(200, {
                    //         "Set-Cookie": "token=encryptedstring; HttpOnly",
                    //         "Access-Control-Allow-Credentials": "true"
                    //     })
                    //     .send();

                    // const cookies = nookies.get(context)

                    // Set
                    // nookies.set({ res: context.res }, 'fromGetInitialProps', 'value', {
                    //     maxAge: 30 * 24 * 60 * 60,
                    //     path: '/',
                    // })

                    // const parsedCookies = parseCookies({ req: context.req });

                    // // Notice how the response object is passed
                    // setCookie({ res: context.res }, 'mytoken', 'value', {
                    //     // maxAge: 30 * 24 * 60 * 60,
                    //     path: '/page',
                    //     httpOnly: true
                    // });

                    // console.log('parsedCookies: ', parsedCookies);




                    // const c = context.setCookie('session', "token", {
                    //     httpOnly: true,
                    //     // secure: true, // Enable this if using HTTPS e.g. in production
                    //     path: '/', // The path: '/' means that the cookie will be valid for the entire domain. It will be sent by the client to the server for any URL path within the domain.
                    //     // sameSite: 'lax',

                    // });


                    // console.log('cookie log: ', c);
                    // check if cookie is set
                    // console.log('cookie: ', context.req.cookies);


                    return {
                        user: responseObj,
                        token: token
                    }
                } else throw new Error('Incorrect credentials');


            } catch (error: any) {
                console.error(error);
                throw new Error(error);
            }

        }
    },

    Query: {
        async getAllUsers() {
            return await uc.getAllUsers();
        },

        async isMe(_, __, context) {

            console.log("Authenticating...")
            const res = context.authenticate();
            // const t = context.req.cookies
            // const cookies = parseCookies(context);

            // const cookies = nookies.get({ req: context.req, })

            // console.log('isme cookies: ', cookies, t);

            return res;
        }
    },
}

export default userResolver;