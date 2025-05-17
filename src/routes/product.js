import { Router } from 'express'
import productsController from '../controllers/ProductsController.js'

const router = Router()

router.post('/', productsController.add)
router.put('/:id', productsController.update)

export default router
