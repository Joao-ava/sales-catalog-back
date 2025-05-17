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

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, bloco, referencia, imagem } = req.body;

      const updateData = {};
      if (name) updateData.name = name;
      if (bloco) updateData.bloco = bloco;
      if (referencia) updateData.referencia = referencia;
      if (imagem) updateData.imagem = imagem;

      const updatedStore = await Store.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedStore) {
        return res.status(404).json({ error: 'Loja não encontrada.' });
      }

      return res.status(200).json(updatedStore.toObject());
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar loja.', details: error.message });
    }
  }
}

const storeController = new StoreController()

export default storeController
