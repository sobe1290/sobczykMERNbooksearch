const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, {_id, username}) => {
        return User.findOne({$or: [{ _id },{ username }]})
    }
  },
  Mutation: {
    login: async (parent, {username, email, password}) => {
        const user = await User.findOne({ $or: [{ username}, { email }] });
        if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },
    addUser: async (parent, args) => {

    },
    saveBook: async () => {

    },
    removeBook: async () => {

    }
  }
};

module.exports = resolvers;
