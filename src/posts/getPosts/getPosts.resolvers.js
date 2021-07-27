import PostModule from "../../../models/Post";

export default {
    Query: {
        async getPosts() {
            try {
                const posts = await PostModule.find();
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    },
};