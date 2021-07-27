import jwt from 'jsonwebtoken';
import {AuthenticationError} from 'apollo-server';

export const checkAuth= (context) => {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        // Bearer ....
        const token = authHeader.split('Bearer ')[1];
        if (token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY);
            return user;
        } catch (err) {
            throw new AuthenticationError('Invalid/Expired token');
        }
    }
        throw new Error("Authentication token must be 'Bearer [token]");
    }
    throw new Error('Authorization header must be provided');
};

// export const getUser = (context) => {
//     const token = context.req.headers.token;
//     if(token) {
//         try {
//             const user = jwt.verify(token, process.env.SECRET_KEY);
//             return user;
//         } catch (err) {
//             throw new AuthenticationError('Invalid/Expired token');
//         }
//     }
//     throw new Error('token header must be provided');
// }