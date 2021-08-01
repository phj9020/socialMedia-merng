import {gql} from '@apollo/client';

const GET_POSTS = gql`
    query getPosts{
        getPosts {
            id
            body
            createdAt
            likes {
                username
            }
            comments {
                id
                username
                createdAt
                body
            }
            username
            likeCount
            commentCount
        }
    }
`

export default GET_POSTS;