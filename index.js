const { ApolloServer } = require("apollo-server");
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');

//Graphql
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => "Hello World!"
    }
}


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
