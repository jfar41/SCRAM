const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose'); //mongoose is the orm(object relational mapper) library 
                                      //which lets us interface with the mongodb database
                                      //allows us to link data models also
//^dependency imports \/relative imports
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');   //bc it's in index we don't have to say more
const { MONGODB } = require('./config.js');     //we destructured MONGODB by having it in {}         

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })     //here taking request body, forwarding to context, and now can access request body in context 
});

mongoose
    .connect(MONGODB, { useNewUrlParser: true}) //useNewUrlParse is to prevent deprecation warnings
    .then(() => {
        console.log('MongoDB Connected')
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.error(err)
    })