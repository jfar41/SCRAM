const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')      //we need destructuring bc it's not the default export
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        }, SECRET_KEY, 
        { expiresIn: '1h' }
        );
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) { //since username & password are straightup arguments in typeDefs, no need to further destructure from a type
            const {errors, valid} = validateLoginInput(username, password);
            
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            } 

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors});
            }

           const token = generateToken(user);

           return {
            ...user._doc,
            id: user._id,    //Bc id is not in doc by default
            token
        };
        },
        async register(
            _,      //we need parent to retain access to args
            { 
                registerInput : { username, email, password, confirmPassword }    //2nd element(object) taking in arguments
            }, 
        ) {   
            // Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });     //here passing {errors}, a payload with object errors, under name we chose, 'Errors'
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

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,    //Bc id is not in doc by default
                token
            };
        }
    }
};