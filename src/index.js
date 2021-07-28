require("dotenv").config();
import { createServer } from 'http';
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {typeDefs, resolvers } from './schema';
import mongoose from 'mongoose';

(async function() {
    const app = express();
    
    const httpServer = createServer(app);
    
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    
    const server = new ApolloServer({
        schema,
        context: ({req}) => ({req}),
    });
    
    await server.start();

    server.applyMiddleware({ app });
    
    SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: server.graphqlPath }
    );

    const PORT = 4000;

    mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=> {
            console.log("MongoDB connected")
            httpServer.listen(PORT, () =>
                console.log(`Server is now running on http://localhost:${PORT}/graphql`)
            );
    });
        
})();






