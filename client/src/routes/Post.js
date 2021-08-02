import React, {useState, useRef} from 'react';
import {gql, useQuery, useMutation} from '@apollo/client';
import { COMMENT_FRAGMENT, LIKE_FRAGMENT } from '../fragment';
import { Button, Card, CardContent, Form, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import useUser from '../hooks/useUser';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

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

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID!, $body: String!){
        createComment(postId:$postId, body:$body) {
            id
            comments {
                ...CommentFragment
            }
            commentCount
        }
    }
    ${COMMENT_FRAGMENT}
`


function Post(props) {
    const postId = props.match.params.id;
    const [comment, setComment] = useState("");
    const {data: meData} = useUser();
    const commentInput = useRef(null);

    // get single post
    const {loading, data} = useQuery(GET_SINGLE_POST, {
        variables: {
            postId
        }
    });

    // Create Comment
    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        variables: {
            postId,
            body: comment
        },
        update: () => {
            setComment('');
            commentInput.current.blur();
        }
    });

    const handleInputChange = (e) => {
        const { value } = e.currentTarget;
        setComment(value);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        createComment();
    };

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
                    <Grid.Column width={14}>
                        <Card fluid>
                            <CardContent>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment.unix(createdAt / 1000).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </CardContent>
                            <hr/>
                            <CardContent extra>
                                <LikeButton user={meData} post={{id, likes, likeCount}} />
                                <MyPopup content='Comment on the Post'>
                                    <Button as='div' labelPosition='right'>
                                        <Button color='teal' basic>
                                            <Icon name='comments'/>
                                        </Button>
                                        <Label basic color='teal' pointing='left'>
                                            {commentCount}
                                        </Label>
                                    </Button>
                                </MyPopup>
                                {meData?.me?.username === username ? 
                                    <DeleteButton postId={id} /> : null
                                }
                            </CardContent>
                        </Card>
                        {meData && 
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input 
                                                type='text' 
                                                placeholder='Comment...' 
                                                name="comment" 
                                                value={comment} 
                                                onChange={handleInputChange}
                                                ref={commentInput}
                                            />
                                            <button 
                                                type='submit' 
                                                className='ui button teal' 
                                                disabled={comment.trim() === ''}
                                                onClick={handleSubmitForm}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        }
                        {comments.map(comment => 
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment.unix(comment.createdAt / 1000).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                    {meData?.me?.username === comment.username && <DeleteButton postId={id} commentId={comment.id} /> }
                                </Card.Content>
                            </Card>
                        )}
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
