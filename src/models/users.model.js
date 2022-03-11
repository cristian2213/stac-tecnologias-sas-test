const { User } = require('../db/models/index');

async function getAllUsers(filter = null) {
  return await User.findAll(filter);
}

async function getOneUser(id, filter = null) {
  const user = await User.findByPk(id, filter);
  return user;
}

async function addNewUser(data) {
  const newUser = await User.create(data);
  return newUser;
}

async function getUserByFilter(filter) {
  if (!filter) throw new Error('The filter parameter is required.');

  const user = await User.findOne(filter);
  return user;
}

module.exports = { getAllUsers, getOneUser, addNewUser, getUserByFilter };
