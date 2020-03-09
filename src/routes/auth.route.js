const { authService } = require('../app/service/auth.service');

module.exports = app => {
  app.post('/token', async (req, res) => {
    const { body } = req;
    res.json(await authService.generateToken(body));
  });

  return app;
};
