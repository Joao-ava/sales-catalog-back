import { Router } from 'express'
import upload from '../middlewares/upload.js';
import ImageController from '../controllers/ImageController.js'

const router = Router()

router.post("/", upload.single('image'), ImageController.save)

export default router
