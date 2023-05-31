import gql from 'graphql-tag';

export default gql`
    type Message {
        id: Int!
        user_id: Int!
        content: String!
        conversation_id: ID!
        created_at: String!
        username: String
    }

    type Mutation {
        # addMessage(user_id: Int!, content: String!, conversation_id: ID!, username: String!): Message!
        addMessage(input: MessageInput!): Message!

    }

    type Query {
        # getAllMessages: [Message!]!
        getMessagesFromConversation(conversation_id: ID!): [Message!]!
    }


    type Subscription {
        messageCreated: Message
    }

    input MessageInput {
        user_id: Int!
        content: String!
        conversation_id: ID!
        username: String!
        receiver_ids: [Int!]!
    }

    # type Subscription {
    #     messageAdded(conversation_id: ID!): ID!
    # }

`