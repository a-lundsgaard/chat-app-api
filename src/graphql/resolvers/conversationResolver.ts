import { Resolvers } from "../generated/graphql";
import ConversationController from "../../database/controllers/conversationController";


const cc = new ConversationController();

const conversationResolver: Resolvers = {
    Query: {
        async getAllConversationsByUserId(_, args) {
            return await cc.getAllConversationsByUserId(args.user_id);
        },

        async getConversationMessages(_, args) {
            console.log('args ', args);
            return await cc.getConversationMessages(args.id);
        }
    },
    Mutation: {
        async createConversation(_, args) {
            console.log('args ', args);
            return await cc.createConversation(args.owner_id, args.name);
        }

    }

}

export default conversationResolver;

