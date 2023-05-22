// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

// sockets
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';


import typeDefs from './src/graphql/schemas/index';
import resolvers from './src/graphql/resolvers/index';
import authMiddleware from './src/middleware/auth';
// import getUser from './src/utils/getUser';
import { getUser } from './src/middleware/auth';
import { GraphQLError } from 'graphql';

import context from './src/graphql/context';


// interface MyContext {
//     // token?: String;
// }

interface MyContext {
    auth?: {
        user: string;
        token: string;
    };
}

// const wsLink = new GraphQLWsLink(createClient({
//     url: 'ws://localhost:4000/subscriptions',
// }));



const startServer = async () => {
    // Required logic for integrating with Express
    const app = express();
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin
    // for our httpServer.

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if app.use
        // serves expressMiddleware at a different path
        path: '/',
    });

    // // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = useServer({ schema }, wsServer);


    const server = new ApolloServer({
        schema,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    // Ensure we wait for our server to start
    await server.start();





    // Set up our Express middleware to handle CORS, body parsing,
    // and our expressMiddleware function.
    // app.use(authMiddleware);

    app.use(
        '/',
        cors<cors.CorsRequest>(),
        // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
        bodyParser.json({ limit: '50mb' }),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req }) => {
                return context(req);
            },
        }),
    );

    // Modified server startup
    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);
};

startServer();