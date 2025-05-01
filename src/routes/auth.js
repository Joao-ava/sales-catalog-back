import { Router } from 'express'
import authController from '../controllers/AuthController.js'

const router = Router()

router.post("/login", authController.auth);

export default router
