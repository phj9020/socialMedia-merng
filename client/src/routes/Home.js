import React from 'react';
import {useQuery, useReactiveVar} from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import {isLoggedInVar} from '../client';
import PostForm from '../components/PostForm';
import GET_POSTS from "../gql/getPosts";
import useUser from "../hooks/useUser";

function Home() {
    const {loading, data} = useQuery(GET_POSTS);
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const {data: meData} = useUser();

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {isLoggedIn && 
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                }
                {loading ? <h1>loading post...</h1> : (
                    <Transition.Group
                    duration={200}
                    >
                        {data?.getPosts?.map(post => 
                        <Grid.Column key={post.id} style={{marginBottom: "20px"}}>
                            <PostCard post={post} meData={meData} />
                        </Grid.Column>
                        )}
                    </Transition.Group>
                )}
            </Grid.Row>
    </Grid>
    )
}

export default Home;
