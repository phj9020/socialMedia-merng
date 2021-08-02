import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { Button, Icon, Label } from "semantic-ui-react";
import {gql, useMutation} from '@apollo/client';
import { COMMENT_FRAGMENT, LIKE_FRAGMENT } from '../fragment';
import MyPopup from '../util/MyPopup';

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId:$postId) {
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

function LikeButton({user, post} ) {
    const [liked, setLiked] = useState(false);
    const {id: postId, likes, likeCount} = post;


    const [likePost, {loading}] = useMutation(LIKE_POST_MUTATION);

    useEffect(()=> {
        if(user && likes.find(like => like.username === user?.me?.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    },[user, likes]);

    const likedButton = user?.me ? (
        liked ? (
            <Button color='red'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='red' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} to={"/login"} color='red' basic>
                <Icon name='heart' />
        </Button>
    )

    const handleLikeButton = (e)=> {
        e.preventDefault();
        if(loading) {
            return;
        }

        const id = e.currentTarget.id
        likePost({
            variables: {
                postId : id
            }
        })
    };

    return (
        <MyPopup content={liked ? "Dislike" : "Like"} >
            <Button as='div' labelPosition='right' id={postId} onClick={handleLikeButton}>
            {likedButton}
            <Label basic color='red' pointing='left'>
                {likeCount}
            </Label>
            </Button>
        </MyPopup>
    )
}

export default LikeButton
