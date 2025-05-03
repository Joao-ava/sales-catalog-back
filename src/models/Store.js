import mongoose, { Schema } from 'mongoose'

const storeSchema = mongoose.Schema({
  name: { type: String, required: true },
  bloco: { type: String, required: true },
  referencia: { type: String, required: true},
  imagem: {type: String, required: true},
});

export default mongoose.model('Store', storeSchema)
