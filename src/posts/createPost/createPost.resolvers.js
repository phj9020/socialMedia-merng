import PostModule from "../../../models/Post";
import {checkAuth} from '../../util/checkAuth';

const resolverFn = async(_, {body}, context) => {
    const user = checkAuth(context);
    
    const newPost = new PostModule({
        body, 
        user : user.id,
        username: user.username,
        createdAt: Date.now(),
    });

    const post = await newPost.save();

    return post;
}

export default {
    Mutation: {
        createPost: resolverFn
    }
}