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
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                    const token = context.signIn(responseObj);
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
        async getAllUsers(_, args, context) {
            context.authenticate();

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