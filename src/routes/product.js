import { Router } from 'express'
import productsController from '../controllers/ProductsController.js'
import upload from '../middlewares/upload.js';

const router = Router()

router.post('/', upload.single('imagem'), productsController.add)
//router.post('/', productsController.add)
//router.put('/:id', productsController.update)
router.put('/:id', upload.single('imagem'), productsController.update)
router.get('/', productsController.list)
router.get('/:id', productsController.getById)


export default router
