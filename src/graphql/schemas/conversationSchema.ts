import gql from 'graphql-tag';

export default gql`
    type Conversation {
        id: ID!
        name: String
        owner_id: Int!
        created_at: String!
        participantIds: [Int!]!
        # updated_at: String!
    }

    type Mutation {
        # createConversation(name: String!, owner_id: Int!): Conversation!
        createConversation(input: ConversationInput!): Conversation!
    }

    type Query {
        getAllConversationsByUserId(user_id: Int!): [Conversation!]!
        getConversationMessages(id: ID!): [Message]
        getMessagesByConversationIdWithUser(id: ID!): [Message]
    }

    type Subscription {
        conversationCreated: Message
        conversationMessageAdded: Message
    }

    input ConversationInput {
        name: String
        owner_id: Int!
        participantIds: [Int!]!
    }

    `