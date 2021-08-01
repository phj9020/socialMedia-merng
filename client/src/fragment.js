import {gql} from '@apollo/client';

export const USER_FRAGMENT = gql`
    fragment UserFragment on User {
        id
        email
        token
        username
        createdAt
    }
`

export const COMMENT_FRAGMENT = gql`
    fragment CommentFragment on Comment {
        id
        body
        username
        createdAt
    }
`

export const LIKE_FRAGMENT = gql`
    fragment LikeFragment on Like {
        id
        username
        createdAt
    }
`