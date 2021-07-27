import {gql} from 'apollo-server';

export default gql`
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }
`