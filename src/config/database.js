import mongoose from 'mongoose'

export default async function connectDatabase() {
  const { log } = console
  try {
    log('Conectando no banco de dados...')
    await mongoose.connect(process.env.MONGO_URI);
    log('Conectado ao banco de dados');
  } catch (err) {
    log(err)
  }
}