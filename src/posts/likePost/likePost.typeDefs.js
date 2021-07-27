import {gql} from 'apollo-server';

export default gql`
    type Mutation {
        likePost(postId: ID!) : Post! 
    }
`