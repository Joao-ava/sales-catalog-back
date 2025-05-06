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
}

const productsController = new ProductsController()

export default productsController
