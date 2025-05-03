import Store from '../models/Store.js';

class StoreController {
  async add(req, res) {
    try {
      const { name, bloco, referencia, imagem } = req.body;


      if (!name || !bloco || !referencia || !imagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      const newStore = await Store.create({
        name,
        bloco,
        referencia,
        imagem
      });

      return res.status(201).json({ ...newStore.toObject() });

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar loja.', details: error.message });
    }
  }
}

const storeController = new StoreController()

export default storeController
