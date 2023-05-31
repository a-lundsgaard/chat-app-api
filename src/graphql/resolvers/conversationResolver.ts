import { Message, Resolvers } from "../generated/graphql";
import ConversationController from "../../database/controllers/conversationController";


const cc = new ConversationController();
const { CONVERSATION_CREATED, MESSAGE_CREATED } = cc.events;

const conversationResolver: Resolvers = {
    Query: {
        async getAllConversationsByUserId(_, args, context) {
            context.authenticate();
            return await cc.getAllConversationsByUserId(args.user_id);
        },

        async getConversationMessages(_, args, context) {
            context.authenticate();
            return await cc.getConversationMessages(args.id);
        }
    },
    Mutation: {
        async createConversation(_, { input }, context) {
            const user = context.authenticate();
            if (user?.id == input.owner_id) {
                cc.pubsub.publish(CONVERSATION_CREATED, { conversationCreated: input });
            }
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

