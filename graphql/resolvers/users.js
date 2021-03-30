const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../utilites/validators');
const { SKEY } = require('../../config');
const User = require('../../Models/User');

//this function generates the authentication token
function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SKEY, 
    { expiresIn: '0.5hr' }
    );
}
module.exports = {
    Mutation: {
        //login function
        async login(_, { username, password }){
            const {errors, valid} = validateLoginInput(username, password);

            if(!valid){
                throw new UserInputError('Errors', {errors});
            }
            const user = await User.findOne({ username });

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Incorrect password';
                throw new UserInputError('Password is incorrect', {errors});
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        //function for registering new users
        async register(_, { registerInput: { username, email, password, confirmPassword }
        },
        ) {
            // Validates user data and hashs password
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
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

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        },
        
    }
}