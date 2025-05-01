import User from '../models/User.js'

class UserController {
  async add(req, res) {
    return res.json();
  }
}

const userController = new UserController();

export default userController;
