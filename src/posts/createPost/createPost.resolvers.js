import PostModule from "../../../models/Post";
import {checkAuth} from '../../util/checkAuth';
import pubsub from '../../pubsub';

const resolverFn = async(_, {body}, context) => {
    console.log('createPost')
    const user = checkAuth(context);

    if(body.trim("") === ""){
        throw new Error("Post body must not be empty");
    }

    const newPost = new PostModule({
        body, 
        user : user.id,
        username: user.username,
        createdAt: Date.now(),
    });

    const post = await newPost.save();

    pubsub.publish('NEW_POST', {
        newPost: post
    })

    return post;
}

export default {
    Mutation: {
        createPost: resolverFn
    }
}