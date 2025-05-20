class ImageController {
  async save(req, res) {
    const imagem = req.file?.filename;
    return res.json({ filename: `/uploads/${imagem}` })
  }
}

const imageController = new ImageController()

export default imageController
