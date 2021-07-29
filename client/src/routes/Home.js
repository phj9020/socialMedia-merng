import React from 'react';
import {useQuery, gql} from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard'

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

function Home() {
    const {loading, data} = useQuery(GET_POSTS);
    
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? <h1>loading post...</h1> : (
                    data?.getPosts?.map(post => 
                    <Grid.Column key={post.id} style={{marginBottom: "20px"}}>
                        <PostCard post={post} />
                    </Grid.Column>
                    )
                )}
            </Grid.Row>
    </Grid>
    )
}

export default Home;
