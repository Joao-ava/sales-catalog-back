import bcryptjs from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken';



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

   async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const updateData = {};

      if (name) updateData.name = name;
      if (email) updateData.email = email;
      
      if (password) {
        const passwordHash = await bcryptjs.hash(password, 10);
        updateData.passwordHash = passwordHash;
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.status(200).json({ ...updatedUser.toObject(), passwordHash: undefined });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário.', details: error.message });
    }
  }


  async login(req, res) {
    try {
      const SECRET = process.env.SECRET_KEY;
      
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      }

      const isMatch = await bcryptjs.compare(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      }

      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });

      const userObj = user.toObject();
      delete userObj.passwordHash;

      return res.json({ user: userObj, token });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login.', details: error.message });
    }
  }
}

const userController = new UserController();
export default userController;
