import { Router } from 'express'
import storeController from '../controllers/StoreController.js'

const router = Router()

router.post('/', storeController.add)

export default router
