import mongoose from 'mongoose'

const storeSchema = mongoose.Schema({
  name: { type: String, required: true },
  bloco: { type: String, required: true },
  referencia: { type: String, required: true},
  imagem: {type: String, required: true},
  horarios: [
    mongoose.Schema({
      weekDay: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true }
    })
  ]
});

export default mongoose.model('Store', storeSchema)
