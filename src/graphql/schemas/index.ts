import userSchema from './userSchema';
import messageSchema from './messageSchema';
import conversationSchema from './conversationSchema';
import { gql } from 'apollo-server-express';

const rootType = gql`
    """
    The entry-point for queries.
    This acts as the top-level api from which all queries must start
    """
    type Query {
        root: String
    }
    
   """
    The entry-point for mutations.
    This acts as the top-level api from which all mutations must start
    """
    type Mutation {
        root: String
    }

    type Subscription {
        root: String
    }

`

export default [
    rootType,
    messageSchema,
    userSchema,
    conversationSchema
]
