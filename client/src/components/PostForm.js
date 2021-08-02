import React, {useState} from 'react';
import { Button, Form } from 'semantic-ui-react';
import {gql, useMutation, useQuery} from '@apollo/client';
import { COMMENT_FRAGMENT, LIKE_FRAGMENT } from '../fragment';
import GET_POSTS from "../gql/getPosts";

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
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
`;


function PostForm() {
    const [body, setBody] = useState("");
    const [bodyError, setBodyError] = useState({});
    const {refetch} = useQuery(GET_POSTS);

    const newPostUpdate = (cache, result) => {
        const {data: {createPost}} = result;
        if(createPost) {
            refetch();
        };
    };

    const [createPost, {loading}] = useMutation(CREATE_POST_MUTATION, {
        onCompleted: (_)=> {
            setBody("");
        },
        onError: (err) => {
            if(err) {
                setBodyError({message : err.message});
            }
        },
        update: newPostUpdate
    });
    
    const handleSubmitForm = (e) => {
        e.preventDefault();
        // createPost
        if(loading) {
            return;
        }
        createPost({
            variables: {
                body
            }
        });
    };

    const handleInputChange = (e) => {
        const {value} = e.target;
        setBody(value);
    };

    const handleHiddenMessage = (e) => {
        const message = document.querySelector(".negative");
        message.style.display= "none";
        setBodyError({});
    };

    return (
        <>
            <Form onSubmit={handleSubmitForm}>
                <h2>Create a Post:</h2>
                <Form.Field>
                    <Form.Input 
                        placeholder="post body"
                        name="body"
                        onChange={handleInputChange}
                        value={body} 
                    />
                    <Button type="submit" color="teal">Submit</Button>
                </Form.Field>
            </Form>
            {Object.keys(bodyError).length > 0 ? 
                <div className="ui negative message">
                    <i className="close icon" style={{ userSelect: "auto"}} onClick={handleHiddenMessage}></i>
                    <div className="header">
                        {Object.values(bodyError).map(error => <li key={error}>{error}</li>)}
                    </div>
                </div>
                : null
            }
        </>
    )
}

export default PostForm
