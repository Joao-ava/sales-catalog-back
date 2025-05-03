import bcryptjs from 'bcryptjs'
import User from '../models/User.js'

class UserController {
  async add(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const passwordHash = await bcryptjs.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        passwordHash
      });

      return res.status(201).json({ ...newUser.toObject(), passwordHash: undefined });

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar usuário.', details: error.message });
    }
  }
}

const userController = new UserController();

export default userController;
