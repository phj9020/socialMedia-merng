import {AuthenticationError} from 'apollo-server';
import PostModule from "../../../models/Post";
import {checkAuth} from '../../util/checkAuth';

const resolverFn = async(_, {postId}, context) => {
    const user = checkAuth(context);
    const post = await PostModule.findById(postId);

    try {
        if (user.username === post.username) {
            await post.delete();
            return 'Post deleted successfully';
        } else {
            throw new AuthenticationError('Action not allowed');
        }
    } catch (err) {
        throw new Error(err);
    }
}

export default {
    Mutation : {
        deletePost: resolverFn
    }
}