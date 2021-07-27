import {gql} from 'apollo-server';


export default gql`
    type Mutation {
        createPost(body: String!): Post!
    }
`