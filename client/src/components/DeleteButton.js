import React, {useState} from 'react';
import { Button, Icon, Confirm } from "semantic-ui-react";
import {gql, useMutation} from '@apollo/client';
import {useHistory} from 'react-router-dom';

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId) 
    }
`

function DeleteButton({postId}) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    let history = useHistory();
    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables : {
            postId
        },
        update: (cache, data)=> {
            setConfirmOpen(false);
            if(data) {
                // remove post from cache
                cache.evict({
                    id: `Post:${postId}`,
                })
            }
        },
        onCompleted: () => {
            history.push("/");
        }
    });

    return (
        <>
            <Button as="div" floated="right" color="red" onClick={()=> setConfirmOpen(true)}>
                <Icon name='trash' style={{margin:0}} />
            </Button>
            <Confirm 
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>
    )
}

export default DeleteButton;
