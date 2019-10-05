const passport = require('./config/passport')

function ensureAuthenticated(req) {
  return false;
}

function getUser(req) {
  return req.user;
}

module.exports = {
  ensureAuthenticated,
  getUser,
};