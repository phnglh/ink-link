import type { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { loginSchema, signupSchema } from './auth.schema'

const authService = new AuthService()

export class AuthController {
  async register(req: Request, res: Response) {
    const data = signupSchema.parse(req.body)
    const user = await authService.signup(data)
    res.status(201).json({ user })
  }

}
