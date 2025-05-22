import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  imagem: { type: String, required: true }, 
  preco: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  storeId: { type: Schema.Types.ObjectId },
});

export default mongoose.model('Product', productSchema);
