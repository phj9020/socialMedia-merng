import userModule from "../../../models/User";
import {UserInputError} from 'apollo-server';
import {validateLoginInput} from '../../util/validators';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const resolverFn = async(_, {username, password}) => {
    const {errors, valid} = validateLoginInput(username, password);
    // find user by username
    const user = await userModule.findOne({username});
    
    // if user not exist throw error
    if(!user) {
        errors.general = "User not Found";
        throw new UserInputError("User not Found", { errors });
    };
    
    // compare password 
    const match = await bcrypt.compare(password, user.password);
    
    // if password not match throw error
    if(!match) {
        errors.general = "Wrong password";
        throw new UserInputError("Wrong password", { errors });
    };

    // not valid throw error 
    if(!valid) {
        throw new UserInputError("Error", {errors})
    };


    // create token with user's id, email. username 
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    }, process.env.SECRET_KEY);


    return {
        ...user.toJSON(),
        id: user.id,
        token,
    }

};

export default {
    Mutation: {
        login: resolverFn
    }
}