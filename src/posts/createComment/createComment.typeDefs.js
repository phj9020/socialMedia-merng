import {gql} from 'apollo-server';

export default gql`
    type Mutation {
        createComment(postId: ID!, body: String!) : Post! 
    }
`