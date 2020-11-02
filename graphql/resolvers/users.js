const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput } = require('../../util/validators')      //we need destructuring bc it's not the default export
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

module.exports = {
    Mutation: {
        async register(
            _,      //we need parent to retain access to args
            { 
                registerInput : { username, email, password, confirmPassword }    //2nd element(object) taking in arguments
            }, 
        ) {   
            //TODO: Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            //TODO: Make sure user doesn't already exist
            const user = await User.findOne({ username });       //passing in a condition 'username'
            if(user) {
                throw new UserInputError('Username is taken',{
                    errors: {
                        username: "This username is taken"      //this error is used to display on front-end form
                    }
                })
            }
            //hash password b4 storing in database and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email, 
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign(
            {
                id: res.id,
                email: res.email,
                username: res.username
            }, SECRET_KEY, 
            { expiresIn: '1h' }
            );

            return {
                ...res._doc,
                id: res._id,    //Bc id is not in doc by default
                token
            }
        }    
    }
}