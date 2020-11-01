const Post = require('../../models/Post');

module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find();    //when no specifying .find() you get ALL, which we want rn
                return posts;
            } catch (err){
                throw new Error(err);
            }
        }
    }
}