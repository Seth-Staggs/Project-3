const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require('apollo-server');

const { SKEY } = require('../../config');
const User = require('../../Models/User');

module.exports = {
    Mutation: {
        async register(_, { registerInput: { username, email, password, confirmPassword }
        },
        ) {
            // Validates user data and hashs password
            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = jwt.sign({
                id: res.id,
                email: res.email,
                username: res.username
            }, SKEY, { expiresIn: '1h' });

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}