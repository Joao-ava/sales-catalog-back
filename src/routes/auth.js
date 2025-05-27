import { Router } from 'express'
import AuthController from '../controllers/AuthController.js'
import authMiddleware from '../middlewares/auth.js'

const router = Router()

router.post("/login", AuthController.auth)
router.get("/my", authMiddleware, AuthController.my)

export default router
