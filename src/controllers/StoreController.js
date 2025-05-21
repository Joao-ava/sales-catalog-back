import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import Store from '../models/Store.js';
import { hostServer } from '../config/server.js';

class StoreController {
  async add(req, res) {
    try {

      const { name, bloco, referencia, horarios } = req.body;

      const imagem = req.file?.filename;

      if (!name || !bloco || !referencia || !imagem || !horarios) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }


      let horariosFormatado;
      try {
        horariosFormatado = typeof horarios === 'string' ? JSON.parse(horarios) : horarios;

        if (!Array.isArray(horariosFormatado)) {
          return res.status(400).json({ error: 'Horários devem ser um array de objetos.' });
        }

        for (const horario of horariosFormatado) {
          if (!horario.weekDay || !horario.from || !horario.to) {
            return res.status(400).json({
              error: 'Cada item em horários deve conter dia, abertura e fechamento.'
            });
          }
        }

      } catch (e) {
        return res.status(400).json({ error: 'Horários em formato inválido.' });
      }

      const newStore = await Store.create({
        name,
        bloco,
        referencia,
        imagem: `uploads/${imagem}`,
        horarios: horariosFormatado
      });
      await User.findByIdAndUpdate(req.user._id, { storeId: newStore._id })

      return res.status(201).json(newStore.toObject());
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar loja.', details: error.message });
    }
  }

  async update(req, res) {
  try {
    const { id } = req.params;
    const { name, bloco, referencia, horarios } = req.body;
    const newImagem =  req.file?.filename;

    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ error: 'Loja não encontrada.' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (bloco) updateData.bloco = bloco;
    if (referencia) updateData.referencia = referencia;

    if (horarios) {
      let horariosFormatado;
      try {
        horariosFormatado = typeof horarios === 'string' ? JSON.parse(horarios) : horarios;

        if (!Array.isArray(horariosFormatado)) {
          return res.status(400).json({ error: 'Horários devem ser um array de objetos.' });
        }

        for (const horario of horariosFormatado) {
          if (!horario.weekDay || !horario.from || !horario.to) {
            return res.status(400).json({
              error: 'Cada item em horários deve conter dia, abertura e fechamento.'
            });
          }
        }

        updateData.horarios = horariosFormatado;
      } catch (e) {
        return res.status(400).json({ error: 'Horários em formato inválido.' });
      }
    }

    if (newImagem && newImagem !== store.imagem) {
     
      const oldImagePath = path.join('uploads', store.imagem);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updateData.imagem = `uploads/${newImagem}`;
    }

    const updatedStore = await Store.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json(updatedStore.toObject());
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar loja.', details: error.message });
  }
  }

  async listStore(req, res) {
    try {
      const stores = await Store.find().sort({ createdAt: -1 });
      const data = stores.map((item) => ({ ...item.toObject(), imagem: `${hostServer}/${item.imagem}` }))
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar lojas.', error: error.message });
    }
  }

  async my(req, res) {
    const { storeId } = req.user
    if (!storeId) return res.status(404).json({ message: 'Usuário sem loja' })
    const store = await Store.findById(storeId)
    const data = store.toObject()
    return res.json({ ...data, imagem: `${hostServer}/${store.imagem}` })
  }
}



const storeController = new StoreController()

export default storeController
