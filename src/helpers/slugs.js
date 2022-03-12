const { randomBytes } = require('crypto');
const slugify = require('slugify');

const getSlug = (str) => {
  const maxLength = 80;
  if (str.length > maxLength) {
    str = str.slice(0, maxLength);
  }

  const serializedStr = slugify(str, {
    lower: true,
    trim: true,
    replacement: '-',
    remove: /[*+~.()'"!:@_#%&=?¿\\<>$|°[\]{}\/¡0-9]/g,
  });
  return (
    serializedStr + '-' + randomBytes(12).toString('base64url').toLowerCase()
  );
};

module.exports = { getSlug };
