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
import context, { ContextManager } from './src/graphql/context/index';


const startServer = async () => {
    // Required logic for integrating with Express
    const app = express();

    // health check
    app.get('/check', (req, res) => {
        res.sendStatus(200);
    });

    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    const httpServer = http.createServer(app);
    // const ctxManager = new ContextManager();

    let ctxManager: ContextManager | null = null;

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,

        // Pass a different path here if app.use
        // serves expressMiddleware at a different path
        clientTracking: true,
        handleProtocols: (protocols, request) => {
            // Enable credentials for WebSocket connections
            return 'graphql-transport-ws';
        },
        path: '/subscriptions',

    });

    // // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = useServer({
        schema,
        // context: async (ctx, msg, args) => {
        //     // This will be run every time the client sends a subscription request
        //     const token = ctx.extra.request.headers.cookie?.split('=')[1];
        //     const user = ctxManager.verifyToken(token);
        //     return { currentUser: user }
        // },
        onError: (err) => {
            console.error("Got subscription error", err);
        },
        onConnect: (ctx) => {
            console.log("SUBSCRIBTION opened");
            // const token = ctx.extra.request.headers.cookie?.split('=')[1]
            // console.log('sub cookie: ', token);
            if (!ctxManager) {
                throw new Error("Invalid subscription credentials");
            }
            const user = ctxManager.verifyToken();
            console.log('sub cookie: ', user);
        },
    }, wsServer);


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
        // cors<cors.CorsRequest>(),
        cors<cors.CorsRequest>({
            origin: true,
            credentials: true,
        }),

        // cors(corsOptions),
        // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
        bodyParser.json({ limit: '50mb' }),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                if (!ctxManager) {
                    ctxManager = new ContextManager(req);
                } else {
                    ctxManager.setReq(req);
                }
                // return new ContextManager(req);
                return ctxManager;
            }
        })
    );

    // Modified server startup
    const PORT = process.env.PORT || 4000;
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT || 4000 }, resolve));
    // httpServer.listen({ port: PORT }, () => {
    //     const address = httpServer.address() || "localhost";
    //     console.log(`🚀 Server ready at ${address}:${PORT}/`);
    // });
    console.log(`🚀 Server ready at http://localhost:4000/`);
    // log the server address dynamically


};

startServer();