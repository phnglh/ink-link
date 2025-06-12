import { PrismaClient } from '../generated/prisma'

export const prisma = new PrismaClient()

export async function connectPrisma() {
  try {
    await prisma.$connect()
    console.log('✅ Connected to database')
  } catch (error) {
    console.error('❌ Could not connect to database:', error)
    process.exit(1) 
  }
}
