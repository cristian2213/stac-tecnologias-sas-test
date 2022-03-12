const { User } = require('../db/models/index');
const { ROLES } = require('../services/roles');

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

async function associateRoles(user, roles = null) {
  const defaultRoles = roles || [ROLES.CUSTOMER];

  const establishedRoles = [];
  for (let i = 0; i < defaultRoles.length; i++) {
    establishedRoles.push(await user.createRole({ name: defaultRoles[i] }));
  }

  return establishedRoles;
}

module.exports = {
  getAllUsers,
  getOneUser,
  addNewUser,
  getUserByFilter,
  associateRoles,
};
