// Note: PrismaClient will be available when deployed to Vercel
// For local development without a database, the app uses localStorage

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined
}

let prisma: any

if (typeof window === 'undefined') {
  try {
    const { PrismaClient } = require('@prisma/client')
    prisma = globalThis.prisma ?? new PrismaClient()
    if (process.env.NODE_ENV !== 'production') {
      globalThis.prisma = prisma
    }
  } catch (e) {
    // PrismaClient not available - using mock
    prisma = null
  }
}

export { prisma }
export default prisma
