import userModule from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { UserInputError } from "apollo-server";
import {validateRegisterInput} from '../../util/validators';

const resolverFn = async(_, { registerInput : {username, password, confirmPassword, email} }) => {
    
    // validate user data
    const { valid, errors} = validateRegisterInput(username, password, confirmPassword, email);

    if(!valid) {
        throw new UserInputError('Errors', { errors });
    }

    // make sure user doesnt already exist
    const alreadyExistEmail = await userModule.findOne({email});
    if(alreadyExistEmail) {
        throw new UserInputError("Email is already in use", { 
            errors: {
                email: "This email is taken",
            }
        });
    }
    const alreadyExistUsername = await userModule.findOne({username});
    if(alreadyExistUsername) {
        throw new UserInputError("Username is already in use", {
            errors: {
                username: "This username is taken",
            }
        })
    }

    // hash the password and create auth token
    password = await bcrypt.hash(password, 12);

    // create new user
    const newUser = new userModule({
        username,
        password,
        email,
        createdAt: Date.now()
    });

    // save in MongoDB 
    const result = await newUser.save();

    
    // create token with id, email. username 
    const token = jwt.sign({
        id: result.id,
        email: result.email,
        username: result.username,
    }, process.env.SECRET_KEY, { expiresIn : "24h"});
    

    return {
        ...result.toJSON(),
        id: result.id,
        token
    }
    
}

export default {
    Mutation: {
        register : resolverFn
    }
}