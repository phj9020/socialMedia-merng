import PostModule from "../../models/Post";

export default {
    Query: {
        async getPost() {
            try {
                const posts = await PostModule.find();
                console.log(posts)
                return posts;
            } catch(err) {
                throw new Error(err);
            }
        }
    },
};