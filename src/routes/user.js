import { Router } from 'express'
import usersController from '../controllers/UsersController.js'

const router = Router();

router.post('/', usersController.add)
router.put('/:id', usersController.update)

export default router;
