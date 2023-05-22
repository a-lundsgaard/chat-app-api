import gql from 'graphql-tag';

export default gql`
    type Conversation {
        id: ID!
        name: String!
        owner_id: Int!
        created_at: String!
        # updated_at: String!
    }

    type Mutation {
        createConversation(name: String!, owner_id: Int!): Conversation!
    }

    type Query {
        getAllConversationsByUserId(user_id: Int!): [Conversation!]!
        getConversationMessages(id: ID!): [Message]
        getMessagesByConversationIdWithUser(id: ID!): [Message]
    }
    `