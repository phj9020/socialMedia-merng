import PostModule from "../../../models/Post";

export default {
    Query: {
        async getPosts() {
            console.log('getPosts')
            try {
                const posts = await PostModule.find().sort({ createdAt: -1});
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    },
};