const { userModel } = require('../models/user.model');
const { connect } = require('../../database/db.config');
class UserRepository {
  async getUser(userId) {
    const db = await connect();
    const [user] = await userModel.find({ userId });
    await db.disconnect();
    return user;
  }

  async getUsers() {
    const db = await connect();
    const users = await userModel.find({});
    await db.disconnect();
    return users;
  }
}
const userRepository = new UserRepository();
module.exports = { userRepository };
