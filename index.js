const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose'); //mongoose is the orm(object relational mapper) library 
                                      //which lets us interface with the mongodb database
                                      //allows us to link data models also
//^dependency imports \/relative imports
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');   //bc it's in index we don't have to say more
const { MONGODB } = require('./config.js');     //we destructured MONGODB by having it in {}         


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })     //here taking request body, forwarding to context, and now can access request body in context 
});

mongoose
    .connect(MONGODB, { useNewUrlParser: true}) //useNewUrlParse is to prevent deprecation warnings
    .then(() => {
        console.log('MongoDB Connected')
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })