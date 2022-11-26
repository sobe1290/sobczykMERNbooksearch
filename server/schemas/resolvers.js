const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        const oneUser = await User.findOne({_id: context.user._id})
        if (!oneUser) {
          return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }
        return oneUser
    }
  },
  Mutation: {
    login: async (parent, {email, password}) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }
        const token = signToken(user);
        return {token, user};
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, {input}, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true  }
      );
      return updatedUser;

    },
    removeBook: async (parent, {bookId}, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
    );
    return updatedUser;
    }
  }
};

module.exports = resolvers;
