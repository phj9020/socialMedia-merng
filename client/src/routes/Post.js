import React from 'react';
import {gql, useQuery} from '@apollo/client';
import { COMMENT_FRAGMENT, LIKE_FRAGMENT } from '../fragment';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import useUser from '../hooks/useUser';
import DeleteButton from '../components/DeleteButton';

const GET_SINGLE_POST = gql`
    query getPost($postId: ID!) {
        getPost(postId:$postId) {
            id
            body
            createdAt
            username
            comments {
                ...CommentFragment
            }
            likes {
                ...LikeFragment
            }
            likeCount
            commentCount
        }
    }
    ${COMMENT_FRAGMENT}, ${LIKE_FRAGMENT}
`


function Post(props) {
    const postId = props.match.params.id;
    
    const {data: meData} = useUser();
    const {loading, data} = useQuery(GET_SINGLE_POST, {
        variables: {
            postId
        }
    });

    let postMarkUp;

    if(loading) {
        postMarkUp = <p>Loding post...</p>
    } else {
        const { id, body, createdAt, username, comments, commentCount, likes, likeCount } = data?.getPost;
        postMarkUp = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            floated="right"
                            size="small"
                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment.unix(createdAt / 1000).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={meData} post={{id, likes, likeCount}} />
                                <Button
                                    as='div' 
                                    labelPosition='right' 
                                    onClick={()=> console.log('comment on post')}
                                >
                                    <Button color='teal' basic>
                                        <Icon name='comments'/>
                                    </Button>
                                    <Label basic color='teal' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                                {meData?.me?.username === username ? 
                                    <DeleteButton postId={id} /> : null
                                }
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }

    return (
        <>
            {postMarkUp}
        </>
    )
}

export default Post
