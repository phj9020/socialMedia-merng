require("dotenv").config();
import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';

// The GraphQL schema
const typeDefs = gql`
    type Query {
        sayHi : String!
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
    Query: {
        sayHi: () => 'asdasd',
    },
};

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

