const jwt = require('jsonwebtoken');
const { JWTSECRET: jwtSecret } = require('../../constants');
const { userRepository } = require('../repository/user.repository');
class AuthService {
  generateToken(payload) {
    return { access_token: `Bearer ${jwt.sign(payload, jwtSecret)}` };
  }

  validateUser(payload) {
    return new Promise(async (resolve, reject) => {
      const { userId, password: payloadPwd } = payload;
      const user = await userRepository.getUser(userId);
      if (user) {
        const { password: userPwd } = user;
        if (userPwd === payloadPwd) {
          resolve(user);
        }
        reject();
      }
      resolve(null);
    });
  }
}

const authService = new AuthService();
module.exports = { authService };
