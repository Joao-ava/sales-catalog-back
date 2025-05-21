import jwt from 'jsonwebtoken'

export const encode = (usuario) => {
  const SECRET = process.env.SECRET_KEY;
  return jwt.sign({ id: usuario._id }, SECRET, { expiresIn: '1d' });
}
export const decode = (token) => {
  const SECRET = process.env.SECRET_KEY;
  return jwt.verify(token, SECRET)
}
