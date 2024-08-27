const User = require('../models/user');

const findUserById = async (id) => {
  return await User.findById(id);
};

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

module.exports = {
  findUserById,
  findUserByUsername,
  findUserByEmail,
  createUser,
};
