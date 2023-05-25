import gql from 'graphql-tag';


export default gql`
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
        created_at: String!
    }

    """
    MUTATIONS
    """
    
    type Mutation {
        registerUser(input: UserRegisterInput!): User!
        login(input: UserLoginInput!): UserLoginResponse!
    }


    """
    QUERIES
    """

    type Query {
        getAllUsers: [User!]!
    }

    type Query {
        isMe: UserResponsObject
    }
    
    """
    The response for when a user is successfully logged in
    """
    type UserLoginResponse {
        user: UserResponsObject
        token: String!
    }

    type UserResponsObject {
        username: String!
        email: String!
        isLoggedIn: Boolean
    }

    """
    Inputs
    """
    input UserRegisterInput {
        email: String!
        password: String!
        username: String!
    }

    input UserLoginInput {
        password: String!
        email: String!
    }



`