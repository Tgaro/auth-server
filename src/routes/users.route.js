const authStrategy = require('../app/service/strategy.service')();
const { userRepository } = require('../app/repository/user.repository');
module.exports = app => {
  app.get('/users', authStrategy.authenticate(), async (req, res) => {
    res.json(await userRepository.getUsers());
  });
  return app;
};
