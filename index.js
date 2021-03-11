const { ApolloServer } = require("apollo-server");
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./Models/Post');

const { MONGODB } = require('./config.js');

//Graphql
const typeDefs = gql`
    type Post {
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
                const posts = await Post.find();
                return posts;
            } catch(err){
                throw new Error(err);
            }
        }
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
