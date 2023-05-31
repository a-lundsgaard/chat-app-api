import { withFilter } from "graphql-subscriptions";
import MessageController from "../../database/controllers/messageController"
import { Message, MessageInput, Resolvers } from "../generated/graphql";

const mc = new MessageController();
const { MESSAGE_CREATED } = mc.events;

const messageResolver: Resolvers = {
    Query: {
        getMessagesFromConversation: async (_, args, context) => {
            return await mc.getMessagesByConversationId(args.conversation_id);
        }
    },
    Mutation: {
        addMessage: async (_, { input }, context) => {
            // console.log('msg', args);   
            const user = context.authenticate();
            const args = input;

            const msg: MessageInput = {
                user_id: args.user_id,
                content: args.content,
                conversation_id: args.conversation_id,
                username: args.username,
                receiver_ids: args.receiver_ids
            }
            // only publish the message if the user is in the receiver_ids array
            if (
                // user?.id != args.user_id &&
                args.receiver_ids.includes(user?.id as number)
            ) {
                console.log('publishing message: ', args.receiver_ids, typeof user?.id, user?.id);
                console.log('publishing message: ', typeof user?.id, typeof args.user_id)
                mc.pubsub.publish(MESSAGE_CREATED, {
                    'messageCreated': msg
                });
            }

            return await mc.addMessage(args);
        }
    },
    Subscription: {
        messageCreated: {
            // subscribe: withFilter(
            //     () => mc.pubsub.asyncIterator([MESSAGE_CREATED]) as any,
            //     (payload, variables, context) => {
            //         console.log('payload: ', payload);
            //         console.log('variables: ', context);
            //         return true
            //         // console.log('payload: ', payload);
            //         // console.log('variables: ', variables);

            //     })
            subscribe: () => {
                // console.log('sub å', ctx.authenticate());
                return mc.pubsub.asyncIterator<Message>([MESSAGE_CREATED]) as any
                // return res;
            }
        }
    },

    // Message: {
    //     username: async (parent) => {
    //         // return parent.username;
    //         // find the user of the message and return the username

    //     }
    // }
}

export default messageResolver;