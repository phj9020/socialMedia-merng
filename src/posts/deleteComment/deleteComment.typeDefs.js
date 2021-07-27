import {gql} from 'apollo-server';

export default gql`
    type Mutation {
        deleteComment(postId: ID!, commentId: ID) : Post! 
    }
`