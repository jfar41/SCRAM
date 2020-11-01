const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose'); //mongoose is the orm(object relational mapper) library 
                                      //which lets us interface with the mongodb database

const { MONGODB } = require('./config.js');     //we destructured MONGODB by having it in {}         

const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World!!!!'
    }
}

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