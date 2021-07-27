import PostModule from "../../../models/Post";


const resolverFn = (_, {postId}, {context}) => {
    console.log(context)
}

export default {
    Mutation :{
        deletePost: resolverFn
    }
}