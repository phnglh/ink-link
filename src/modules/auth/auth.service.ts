import * as bcrypt from 'bcrypt'
import { prisma } from '../../prisma'

export class AuthService {
  
  async signup(data: any) {
    const hashPassword = await bcrypt.hash(data.password, 10)
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashPassword
      }
    })
    return user
  } 
}
