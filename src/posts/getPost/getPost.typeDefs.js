import {gql} from 'apollo-server';

export default gql`
    type Query { 
        getPost(postId: ID!) : Post
    }
`