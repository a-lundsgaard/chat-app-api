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
        addMessage(user_id: Int!, content: String!, conversation_id: ID!): Message!
    }

    type Query {
        # getAllMessages: [Message!]!
        getMessagesFromConversation(conversation_id: ID!): [Message!]!
    }


    type Subscription {
        messageCreated: Message
    }

    # type Subscription {
    #     messageAdded(conversation_id: ID!): ID!
    # }

`