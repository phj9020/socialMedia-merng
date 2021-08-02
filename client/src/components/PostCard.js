import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import moment from 'moment';
import {Link} from 'react-router-dom';
import LikeButton from './LikeButton';
import DeleteButton from "./DeleteButton";

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
        meData
    }) {

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
                <LikeButton user={meData} post={{id, likes, likeCount}}/>
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
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
    );
}

export default PostCard;
