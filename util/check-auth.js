const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');        //need to require jsonwebtoken to decode token we got
const {SECRET_KEY} = require('../config');

module.exports = (context) => {
    // context ={ ... headers }     context will have an object and among many things have headers. Inside headers we need to get to authorizaton header
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
        //if have it, need to get token from it. A convention when working with auth token is sending header with value of Bearer ....
        const token = authHeader.split('Bearer ')[1];   //bc there will be two strings. First is 'Bearer ' and second is actual token.
                                                        //since split returns array of strings, we do [1]
        if (token){
            try{
                const user = jwt.verify(token, SECRET_KEY);
                return user;    //if this fails, will go to catch block
            } catch(err){
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error("Authentication token must be \'Bearer [token]");
    }
    throw new Error('Authorization header must be provided');
}