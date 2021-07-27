import PostModule from "../../../models/Post";

const resolverFn = async(_, {postId}) => {
    
    try {
        const post = await PostModule.findById(postId);
        if(!post) {
            throw new Error("Post not Found");
        } else {
            return post;
        }  
    } catch (err) {
        throw new Error(err);
    } 
}

export default {
    Query: {
        getPost : resolverFn
    },
}