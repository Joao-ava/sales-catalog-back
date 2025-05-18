import { Router } from 'express'
import storeController from '../controllers/StoreController.js'
import upload from '../middlewares/upload.js';

const router = Router()

router.post('/', upload.single('imagem'), storeController.add);
//router.post('/', storeController.add)
//router.put('/:id', storeController.update)
router.put('/:id', upload.single('imagem'), storeController.update);

export default router
