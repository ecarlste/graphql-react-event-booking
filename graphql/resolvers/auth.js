const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

const AuthResolvers = {
    createUser: async args => {
        try {
            const user = await User.findOne({ email: args.userInput.email })

            if (user) {
                throw new Error('User already exists.');
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const createdUser = new User({
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await createdUser.save();

            return {
                ...result._doc,
                password: null,
                _id: result.id
            };
        } catch (err) {
            throw err;
        }
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error('Unable to authenticate!');
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            throw new Error('Unable to authenticate!');
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'somesupersecretkey :-P',
            { expiresIn: '1h' }
        );

        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1
        }
    }
}

module.exports = AuthResolvers;
