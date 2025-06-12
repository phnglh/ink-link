import { Router } from 'express'
import { AuthController } from './auth.controller'

const router = Router()
const controller = new AuthController()

router.post('/register', controller.register.bind(controller))

export default router
