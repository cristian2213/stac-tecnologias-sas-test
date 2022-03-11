const argon2 = require('argon2');

async function comparePasswords(hash, password) {
  if (!hash || !password)
    throw new Error('The hash and password parameters are required.');

  const comparison = await argon2.verify(hash, password);
  return comparison;
}

module.exports = {
  comparePasswords,
};
