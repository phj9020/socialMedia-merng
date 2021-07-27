import PostModule from "../../../models/Post";
import {checkAuth} from '../../util/checkAuth';
import {UserInputError} from "apollo-server";

const resolverFn = async(_, {postId, body}, context) => {
    const user = checkAuth(context);
    const post = await PostModule.findById(postId);
    
    if(body.trim() === '') {
        throw new UserInputError("Empty Comment", {
            errors : {
                body: 'Comment body must not be empty'
            }
        });
    };

    if(post) {
        post.comments.unshift({
            body,
            username : user.username,
            createdAt: Date.now(),
        });
        await post.save();
        return post;
    } else {
        throw new UserInputError("Post not Found");
    }

}

export default {
    Mutation: {
        createComment : resolverFn
    }
}