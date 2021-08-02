import React, {useState} from 'react';
import { Button, Icon, Confirm } from "semantic-ui-react";
import {gql, useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import { COMMENT_FRAGMENT, LIKE_FRAGMENT } from '../fragment';
import MyPopup from '../util/MyPopup';

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId) 
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
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

function DeleteButton({postId, commentId}) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    let history = useHistory();

    // if commentId exist use DeleteComment mutation else use DeletePost mutation
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostOrComment] = useMutation(mutation, {
        variables : {
            postId, commentId
        },
        update: (cache, data)=> {
            // when delete post 
            if(!commentId) {
                setConfirmOpen(false);
                if(data) {
                    // remove post from cache
                    cache.evict({
                        id: `Post:${postId}`,
                    })
                }
            } else {
                setConfirmOpen(false);
                if(data) {
                    // delete comment cache
                    cache.evict({
                        id: `Comment:${commentId}`
                    });
                }
            }
        },
        onCompleted: () => {
            // when delete post 
            if(!commentId) {
                history.push("/");
            }
        }
    });

    return (
        <>
            <MyPopup 
                content={commentId ? 'Delete Comment':'Delete Post' }
            >
                <Button as="div" floated="right" color="red" onClick={()=> setConfirmOpen(true)}>
                <Icon name='trash' style={{margin:0}} />
                </Button>
            </MyPopup>
            <Confirm 
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deletePostOrComment}
            />
            
        </>
    )
}

export default DeleteButton;
