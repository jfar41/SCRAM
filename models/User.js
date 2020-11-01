const { model, Schema } = require('mongoose'); //destructured 2 elements

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});

module.exports = model('User', userSchema);