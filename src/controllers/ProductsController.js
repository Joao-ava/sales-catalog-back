import fs from 'fs';
import path from 'path';
import Product from '../models/Product.js';
import { hostServer } from '../config/server.js';

class ProductsController {
  async add(req, res) {
    try {
      const { storeId } = req.user;
      const { nome, preco } = req.body;
      const imagem = req.file?.filename;

      if (!nome || !imagem || !preco) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      const novoProduto = await Product.create({
        nome,
        imagem: `uploads/${imagem}`,
        preco,
        storeId
      });

      return res.status(201).json({ produto: novoProduto });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno no servidor.', error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, preco } = req.body;
      const novaImagem = req.file?.filename;

      const produto = await Product.findById(id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      const updateData = {};
      if (nome) updateData.nome = nome;
      if (preco !== undefined) updateData.preco = preco;

      if (novaImagem && novaImagem !== produto.imagem) {
        const oldImagePath = path.join('uploads', produto.imagem);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
        updateData.imagem = novaImagem;
      }

      const produtoAtualizado = await Product.findByIdAndUpdate(id, updateData, { new: true });

      return res.status(200).json({
        ...produtoAtualizado.toObject(),
        imagem: `${hostServer}/${produtoAtualizado.imagem}`
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar produto.', error: error.message });
    }
  }

  async list(req, res) {
    try {
      const produtos = await Product.find().sort({ createdAt: -1 });
      const items = produtos.map((item) => ({ ...item.toObject(), imagem: `${hostServer}/${item.imagem}` }))
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar produtos.', error: error.message });
    }
  }

  async listByStore(req, res) {
    try {
      const { storeId } = req.params;
      const produtos = await Product.find({ storeId }).sort({ createdAt: -1 });
      const items = produtos.map((item) => ({ ...item.toObject(), imagem: `${hostServer}/${item.imagem}` }))
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar produtos.', error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const products = await Product.findById(id);
      if (!products) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      return res.status(200).json({ ...products.toObject(), imagem: `${hostServer}/${products.imagem}` });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar produto.', error: error.message });
    }
  }

}

const productsController = new ProductsController()

export default productsController
