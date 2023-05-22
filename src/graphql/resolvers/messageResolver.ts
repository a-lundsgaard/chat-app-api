import MessageController from "../../database/controllers/messageController"
// import { Resolvers } from "../../generated/graphql";
import { Message, Resolvers } from "../generated/graphql";
// import { PubSub } from 'graphql-subscriptions';


const mc = new MessageController();
// const pubsub = new PubSub();

const messageResolver: Resolvers = {
    Query: {
        getMessagesFromConversation: async (_, args) => {
            return await mc.getMessagesByConversationId(args.conversation_id);
        }
    },
    Mutation: {
        addMessage: async (_, args) => {
            console.log('msg', args);
            mc.pubsub.publish('MESSAGE_CREATED', { messageCreated: args });
            return await mc.addMessage(args);
        }
    },
    Subscription: {
        messageCreated: {
            subscribe: () => {
                // console.log('sub', args);
                return mc.pubsub.asyncIterator(['MESSAGE_CREATED']) as any;
                // return res;
            }
        }
    }
}

export default messageResolver;