import { prisma } from '@/lib/prisma'
import { randomUUID } from 'node:crypto'

async function main(): Promise<void> {
  const enviroment = process.env.NODE_ENV
  console.log('NODE_ENV', enviroment)

  if (!enviroment || enviroment === 'development' || enviroment === null) {
    console.log('Running Dev Seed....')
    await seedDev()
    console.log('Finished Dev Seed....')
  } else if (enviroment === 'deploy') {
    console.log('Running Deploy Seed....')
    await seedDeploy()
    console.log('Finished Deploy Seed....')
  } else if (enviroment === 'test') {
    console.log('Running Test Seed....')
    await seedTest()
    console.log('Finished Test Seed....')
  } else if (enviroment === 'production') {
    console.log('Running Production Seed....')
    await seedProduction()
    console.log('Finished Production Seed....')
  }
}

async function seedProduction(): Promise<void> {}

async function seedDeploy(): Promise<void> {
  await cleanDatabase()

  await createDepartments()
}

async function seedTest(): Promise<void> {
  await cleanDatabase()

  await createDepartments()
}

async function seedDev(): Promise<void> {
  await cleanDatabase()

  await createDepartments()
}

async function createDepartments(): Promise<void> {
  await prisma.department.upsert({
    where: {
      name: 'Vendas',
    },
    create: {
      name: 'Vendas',
      description: 'Equipe de vendas',
      createdBy: randomUUID(),
    },
    update: {},
  })
}

async function cleanDatabase(): Promise<void> {
  console.log(
    'WARNING!!!! ... Cleaning all data from data base in 5 seconds...',
  )

  await new Promise((resolve) => setTimeout(resolve, 5000))

  console.log('Starting Cleaning...')

  await prisma.department.deleteMany()

  console.log('Finished Cleaning...')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
