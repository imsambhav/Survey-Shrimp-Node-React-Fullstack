// keys.js figure out what set of credentials to return

if (process.env.NODE_ENV === 'production') {
  // We are in production - return prod keys set
  module.exports = require('./prod');
} else {
  // We are in development - return the dev keys set
  module.exports = require('./dev');
}
