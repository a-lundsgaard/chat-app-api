import gql from 'graphql-tag';


export default gql`
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
        created_at: String!
    }
    
    type Mutation {
        registerUser(username: String!, password: String!, email: String! ): User!
        login(username: String!, password: String!): String
    }

    type Query {
        getAllUsers: [User!]!
    }
`