import PostModule from "../../../models/Post";
import {checkAuth} from '../../util/checkAuth';

const resolverFn = async(_, {postId}) => {

}

export default {
    Mutation: {
        likePost : resolverFn
    }
}