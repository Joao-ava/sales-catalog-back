import Product from '../models/Product.js';

class ProductsController {
  async add(req, res) {
    const { nome, imagem, preco } = req.body;

    if (!nome || !imagem || !preco) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try{
      const novoProduto = await Product.create({
        nome,
        imagem,
        preco
      });

      return res.status(201).json({
        produto: novoProduto
      });

    } catch(error){
      return res.status(500).json({ message: "Erro interno no servidor.", error });
    }
  }

   async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, imagem, preco } = req.body;

      const updateData = {};
      if (nome) updateData.nome = nome;
      if (imagem) updateData.imagem = imagem;
      if (preco !== undefined) updateData.preco = preco;

      const produtoAtualizado = await Product.findByIdAndUpdate(id, updateData, { new: true });

      if (!produtoAtualizado) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      return res.status(200).json(produtoAtualizado.toObject());
    } catch (error) {
      return res.status(500).json({ message: "Erro ao atualizar produto.", error: error.message });
    }
  }

  async list(req, res) {
    try {
      const produtos = await Product.find().sort({ createdAt: -1 });
      return res.status(200).json({ produtos });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar produtos.', error: error.message });
    }
  }
}

const productsController = new ProductsController()

export default productsController
