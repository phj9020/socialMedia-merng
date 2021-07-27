import {gql} from 'apollo-server';


export default gql`
    type Mutation {
        deletePost(postId: ID!): String!
    }
`