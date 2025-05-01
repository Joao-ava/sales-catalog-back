import User from '../models/User.js'

class AuthController {
  async auth(req, res) {
    return res.json()
  }
}

const authController = new AuthController()

export default authController;
