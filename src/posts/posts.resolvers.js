import pubsub from '../pubsub';

export default {
    Subscription : {
        newPost: {
            subscribe : () => pubsub.asyncIterator('NEW_POST')
        }
    },
    // computed fields for Post
    // parent aargument brings type Post itself
    Post: {
        likeCount: (parent) => {
            return parent.likes.length
        },
        commentCount: (parent) => {
            return parent.comments.length
        }
    }
}