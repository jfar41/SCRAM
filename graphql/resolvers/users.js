const User = require('../../models/User');

module.exports = {
    Mutation: {
        register(_, { registerInput : { username, email, password, confirmPassword }    //2nd element(object) taking in arguments
        }, context, 
        info
        ) {   
            //TODO: Validate user data
            //TODO: Make sure user doesn't already exist
            //TODO: hash password b4 storing in database and create an auth token
        }    
    }
}