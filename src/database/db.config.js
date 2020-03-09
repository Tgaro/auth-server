const mongoose = require('mongoose');

const {
  DB_USER: user,
  DB_PASS: pwd,
  DB_HOST: host,
  DB_PORT: port,
  DB_DATABASE: db,
} = process.env;

const connectionString = `mongodb://${user}:${pwd}@${host}:${port}/${db}`;
const connect = async () => {
  mongoose.Promise = global.Promise;
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
};

module.exports = { connect };
