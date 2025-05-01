import mongoose, { Schema } from 'mongoose'

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  // id da loja
  storeId: { type: Schema.Types.ObjectId },
});

export default mongoose.model('User', userSchema)
