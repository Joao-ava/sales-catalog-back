import User from '../models/User.js';
import bcrypt from 'bcryptjs';

class AuthController {
  async auth(req, res) {
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

      return res.status(200).json({
        message: "Login realizado com sucesso.",
        usuario: {
          id: usuario.id,
          nome: usuario.name,
          email: usuario.email,
          storedId: usuario.storedId
        }
      });

    } catch (error) {
      return res.status(500).json({ message: "Erro interno no servidor.", error });
    }
  }
}

const authController = new AuthController();
export default authController;
