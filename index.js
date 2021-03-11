//dependencies
const { ApolloServer } = require("apollo-server");
const gql = require('graphql-tag');
const mongoose = require('mongoose');

//linking other files
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');






//Server listener
const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log( "you are connected to MongoDB")
        return server.listen({ port: 3000 })   
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    });
