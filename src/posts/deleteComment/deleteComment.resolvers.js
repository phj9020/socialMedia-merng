import PostModule from "../../../models/Post";
import {checkAuth} from '../../util/checkAuth';
import {AuthenticationError} from "apollo-server";

const resolverFn = async(_, {postId, commentId}, context) => {
    const post = await PostModule.findById(postId);
    const user = checkAuth(context);
    console.log("current User : ", user)

    // check if post exist
    if(!post) {
        throw new Error("Post not Found");
    }

    // check if comment exist 
    const commentExist = post.comments.find(comment => comment._id.toString() === commentId);
    if(!commentExist) {
        throw new Error("Comment is not exist");
    }

    // check if comment is mine 
    const isMine = post.comments.find((comment) => comment.username === user.username);
    if(!isMine) {
        throw new AuthenticationError("Only Comment owner can delete comment")
    }

    // delete comments
    post.comments.pull({
        _id : commentId,
    });
    // save post 
    await post.save();
    return post;
}

export default {
    Mutation: {
        deleteComment : resolverFn
    }
}