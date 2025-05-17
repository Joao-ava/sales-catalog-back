import { Router } from 'express'
import storeController from '../controllers/StoreController.js'

const router = Router()

router.post('/', storeController.add)
router.put('/:id', storeController.update)

export default router
