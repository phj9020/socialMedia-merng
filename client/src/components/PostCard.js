import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from 'moment';
import {Link} from 'react-router-dom';
import useUser from "../hooks/useUser";


function PostCard({
        post: {
        id,
        body,
        createdAt,
        likes,
        comments,
        username,
        likeCount,
        commentCount,
        },
    }) {

    const {data} = useUser();

    const handleLikePost = (e)=> {
        console.log("like post")
    };

    
    return (
        <Card fluid>
            <Card.Content as={Link} to={`/posts/${id}`}>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment.unix(createdAt / 1000).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={handleLikePost}>
                    <Button color='red' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='red' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='teal' basic>
                        <Icon name='comments'/>
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {data && data?.me?.username === username ? 
                    <Button as="div" color="red">
                        delete
                    </Button>
                    : null
                }
            </Card.Content>
        </Card>
    );
}

export default PostCard;
