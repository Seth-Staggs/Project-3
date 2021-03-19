const { AuthenticationError, UserInputError } = require('apollo-server');


const Post = require('../../Models/Post');
const checkAuth = require('../../utilites/check-auth');

module.exports = {
    Query: {
        //Fetch all Posts
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        //Fetch Specific Post
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error("Post not found")
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        //Create Post
        async createPost(_, { body }, context) {
            const user = checkAuth(context);
            console.log(user);

            if(body.trim() === ''){
                throw new Error('Post body cannot be empty');
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            })

            return post;
        },
        //Delete Post/Verify post owner
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post has been Deleted';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        //Likes or Unlikes a post
        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);
            console.log(postId);
            const post = await Post.findById(postId);
            console.log(post);
            if (post) {
              if (post.likes.find((like) => like.username === username)) {
                post.likes = post.likes.filter((like) => like.username !== username);
              } else {
                post.likes.push({
                  username,
                  createdAt: new Date().toISOString()
                });
              }
              
              await post.save();
              return post;
            } else throw new UserInputError('Post not found');
        }
    },
    Subscription: {
        newPost: {
          subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
};