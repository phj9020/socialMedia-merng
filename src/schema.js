import {loadFilesSync, mergeResolvers, mergeTypeDefs} from 'graphql-tools';

// load Type definition
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
export const typeDefs = mergeTypeDefs(loadedTypes);

// load resolver -> queries and mutations
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);
export const resolvers = mergeResolvers(loadedResolvers);