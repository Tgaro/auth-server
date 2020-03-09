const {
  JWTSECRET: jwtSecret,
  JWTSESSION: jwtSession,
} = require('../../constants');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const Strategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const params = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const { authService } = require('./auth.service');
const { ExceptionHandler } = require('../exception/exception');

module.exports = () => {
  const strategy = new Strategy(params, async (payload, done) => {
    const user = await authService
      .validateUser(payload)
      .then(res => res)
      .catch(() => null);
    if (user) {
      return done(null, user);
    } else {
      return done(new ExceptionHandler(500, 'Invalid token.'), null);
    }
  });

  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', jwtSession),
  };
};
