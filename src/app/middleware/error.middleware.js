const { ExceptionHandler } = require('../exception/exception');
const errorHandler = async (err, req, res, next) => {
  const { statusCode = 500, message, stack } = err;
  console.log(stack);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

module.exports = app => {
  app.use('*', ({ method, url }) => {
    throw new ExceptionHandler(404, `Can't ${method} on route: ${url}`);
  });
  app.use(errorHandler);
  return app;
};
