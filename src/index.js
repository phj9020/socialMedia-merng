require("dotenv").config();
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import {typeDefs, resolvers } from './schema';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        console.log("MongoDB connected")
        return server.listen()
    })
    .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });

