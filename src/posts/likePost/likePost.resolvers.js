import PostModule from "../../../models/Post";
import {checkAuth} from '../../util/checkAuth';

const resolverFn = async(_, {postId}, context) => {
    const post = await PostModule.findById(postId);
    const user = checkAuth(context);

    // check if post exist 
    if(!post) {
        throw new Error("Post not Found");
    } 

    // check if already liked
    if(post.likes.find(like => like.username === user.username)) {
        // post already liked, unlike post
        post.likes = post.likes.filter(like => like.username !== user.username);
    } else {
        // like post 
        post.likes.push({
            username : user.username,
            createdAt : Date.now()
        })
    }
    await post.save();
    return post;
}

export default {
    Mutation: {
        likePost : resolverFn
    }
}