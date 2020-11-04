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
        },
        async getPost(_, { postId }) {
            try{
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context){     //bc of what did in index.js, this context now has request body so we can access header and determine user authentication
            
        }
    }
}