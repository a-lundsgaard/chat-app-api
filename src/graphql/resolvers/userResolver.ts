import UserController from "../../database/controllers/userController"
import { Resolvers } from "../generated/graphql";

const uc = new UserController();

const userResolver: Resolvers = {
    Mutation: {
        async registerUser(_, args) {
            return await uc.registerUser(args);
        },

        async login(_, { username, password }) {
            return await uc.login(username, password);
        }
    },

    Query: {
        async getAllUsers() {
            return await uc.getAllUsers();
        }
    },
}

export default userResolver;