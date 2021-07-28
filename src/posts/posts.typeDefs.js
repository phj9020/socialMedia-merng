import {gql} from 'apollo-server';

export default gql`
    type Subscription {
        newPost: Post!
    }
    type Comment {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }
    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comment]!
        likes: [Like]!
        likeCount: Int!
        commentCount: Int!
    }
`