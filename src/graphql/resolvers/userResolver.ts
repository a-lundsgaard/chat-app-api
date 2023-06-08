import UserController from "../../database/controllers/userController"
import { Resolvers } from "../generated/graphql";
import bcrypt from 'bcrypt';

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
            const user = context.authenticate();
            return user;
        }
    },
}

export default userResolver;