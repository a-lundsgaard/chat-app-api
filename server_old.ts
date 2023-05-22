import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import cors from 'cors';
import { readFileSync } from 'fs';

import http from 'http';
import typeDefs from './src/graphql/schemas/index';
import resolvers from './src/graphql/resolvers/index';



const startServer = async () => {

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const app = express();
  // app.use(cors())

  // Start Apollo Server
  // await server.start();

  // server.applyMiddleware({ app });

  // const PORT = process.env.PORT || 4000;

  // app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
  // });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  // });

  // console.log(`🚀  Server ready at: ${url}`);


};

startServer();
