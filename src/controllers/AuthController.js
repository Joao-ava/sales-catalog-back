import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

class AuthController {
  async auth(req, res) {
    const SECRET = process.env.SECRET_KEY;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }

    try {
      const usuario = await User.findOne({ email });

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const comparaSenha = await bcrypt.compare(password, usuario.passwordHash);

      if (!comparaSenha) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      const token = jwt.sign({ id: usuario._id }, SECRET, { expiresIn: '1d' });
      return res.status(200).json({
        token,
        message: "Login realizado com sucesso.",
        usuario: {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
          storeId: usuario.storeId
        }
      });

    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Erro interno no servidor.", error });
    }
  }

  async my(req, res) {
    const usuario = req.user;
    return res.json({
      id: usuario._id,
      name: usuario.name,
      email: usuario.email,
      storeId: usuario.storeId
    });
  }
}

const authController = new AuthController();
export default authController;
