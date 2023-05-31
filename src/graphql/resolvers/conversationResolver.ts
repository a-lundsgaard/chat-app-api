import { Message, Resolvers } from "../generated/graphql";
import ConversationController from "../../database/controllers/conversationController";


const cc = new ConversationController();
const { CONVERSATION_CREATED, MESSAGE_CREATED } = cc.events;

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
        async createConversation(_, { input }, context) {
            console.log('args ', input);
            const user = context.authenticate();
            if (user?.id == input.owner_id) {
                // throw new Error('User not authenticated');
                cc.pubsub.publish(CONVERSATION_CREATED, { conversationCreated: input });
            }
            // return await cc.createConversation(args.owner_id, args.name);
            const name = input.name ? input.name : null;
            return await cc.createConversationWithParticipants(input.owner_id, name, input.participantIds);
        }
    },

    Subscription: {
        conversationCreated: {
            subscribe: () => {
                return cc.pubsub.asyncIterator([CONVERSATION_CREATED]) as any;
            }
        },
        conversationMessageAdded: {
            subscribe: () => {
                return cc.pubsub.asyncIterator<Message>([MESSAGE_CREATED]) as any
            }
        }

    }
}

export default conversationResolver;

