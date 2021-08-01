import userModule from "../../../models/User";
import {checkAuth} from '../../util/checkAuth';
import jwt from 'jsonwebtoken';

const resolverFn = async(_,__, context) => {
    const user = checkAuth(context);
    const userDb = await userModule.findOne({_id: user.id});

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, process.env.SECRET_KEY);

    return {
        id: user.id,
        email: user.email,
        token: token,
        username: user.username,
        createdAt: userDb.createdAt,
    }
}

export default {
    Query :{
        me: resolverFn
    }
}