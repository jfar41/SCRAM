const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose'); //mongoose is the orm(object relational mapper) library 
                                      //which lets us interface with the mongodb database
                                      //allows us to link data models also
//^dependency imports \/relative imports

const Post = require('./models/Post');
const { MONGODB } = require('./config.js');     //we destructured MONGODB by having it in {}         

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
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
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true}) //useNewUrlParse is to prevent deprecation warnings
    .then(() => {
        console.log('MongoDB Connected')
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })