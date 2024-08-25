



import { PrismaClient } from "@prisma/client";


const prismaConnection= () => {
    return new PrismaClient()
}


type PrismaClientSingleton = ReturnType<typeof prismaConnection>


const globalPrisma = globalThis as unknown as {
    prisma : PrismaClientSingleton | undefined
}


const prisma = globalPrisma.prisma ?? prismaConnection()

export default prisma

if(process.env.NODE_ENV !== 'production' ) globalPrisma.prisma = prisma