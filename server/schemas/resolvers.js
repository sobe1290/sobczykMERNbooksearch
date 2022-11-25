const { User } = require('../models');
const { signToken } = require('../utils/auth');

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
        return {token, user};
    },
    addUser: async (parent, args) => {
      const newUser = await User.create(args)
      const token = signToken(user);
      return {newUser, token}
    },
    saveBook: async (parent, {body}, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: body } },
        { new: true }
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
