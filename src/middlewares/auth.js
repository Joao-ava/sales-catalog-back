import User from "../models/User.js"
import { decode } from "../utils/auth.js"

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: 'Autenticação é necessaria' })
  
  const [_, token] = auth.split(' ')
  try {
    const { id } = decode(token)
    const user = await User.findById(id)
    req.user = { ...user.toObject(), passwordHash: undefined }
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Login expirado' })
  }
}

export default authMiddleware
