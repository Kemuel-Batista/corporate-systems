import { CostCenterStatus } from '@/enums/cost-center'
import { ProductStatus } from '@/enums/product'
import { SupplierStatus } from '@/enums/supplier'
import { WarehouseStatus } from '@/enums/warehouse'
import { prisma } from '@/lib/prisma'
import { Department, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

async function main(): Promise<void> {
  await cleanDatabase()

  const department = await createDepartments()
  const user = await createUser(department)
  await createWarehouses(user)
  await createProducts(user)
  await createSuppliers(user)
  await createCostCenters(user)
  await createClients()
}

async function createDepartments(): Promise<Department> {
  const department = await prisma.department.upsert({
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

  return department
}

async function createUser(department: Department): Promise<User> {
  const hashedPassword = await hash('01021993', 6)

  const user = await prisma.user.upsert({
    where: {
      email: 'kemuellima20@gmail.com',
    },
    create: {
      email: 'kemuellima20@gmail.com',
      name: 'Kemuel',
      departmentId: department.id,
      passwordHash: hashedPassword,
    },
    update: {},
  })

  return user
}

async function createWarehouses(user: User): Promise<void> {
  await prisma.warehouse.upsert({
    where: {
      name: 'Warehouse-01',
    },
    create: {
      name: 'Warehouse-01',
      description: 'Warehouse 01',
      status: WarehouseStatus.ACTIVE,
      createdBy: user.id,
    },
    update: {},
  })

  await prisma.warehouse.upsert({
    where: {
      name: 'Warehouse-02',
    },
    create: {
      name: 'Warehouse-02',
      description: 'Warehouse 02',
      status: WarehouseStatus.ACTIVE,
      createdBy: user.id,
    },
    update: {},
  })
}

async function createProducts(user: User): Promise<void> {
  await prisma.product.upsert({
    where: {
      name: 'Product-01',
    },
    create: {
      name: 'Product-01',
      description: 'Product 01',
      status: ProductStatus.ACTIVE,
      createdBy: user.id,
    },
    update: {},
  })

  await prisma.product.upsert({
    where: {
      name: 'Product-02',
    },
    create: {
      name: 'Product-02',
      description: 'Product 02',
      status: ProductStatus.ACTIVE,
      createdBy: user.id,
    },
    update: {},
  })
}

async function createSuppliers(user: User): Promise<void> {
  await prisma.supplier.upsert({
    where: {
      name: 'Supplier-01',
    },
    create: {
      name: 'Supplier-01',
      description: 'Supplier 01',
      status: SupplierStatus.ACTIVE,
      createdBy: user.id,
    },
    update: {},
  })

  await prisma.supplier.upsert({
    where: {
      name: 'Supplier-02',
    },
    create: {
      name: 'Supplier-02',
      description: 'Supplier 02',
      status: SupplierStatus.ACTIVE,
      createdBy: user.id,
    },
    update: {},
  })
}

async function createCostCenters(user: User): Promise<void> {
  await prisma.costCenter.upsert({
    where: {
      code: 'Cost-Center-01',
    },
    create: {
      code: 'Cost-Center-01',
      name: 'Cost-Center 01',
      status: CostCenterStatus.ACTIVE,
      createdBy: user.id,
    },
    update: {},
  })

  await prisma.costCenter.upsert({
    where: {
      code: 'Cost-Center-02',
    },
    create: {
      code: 'Cost-Center-02',
      name: 'Cost-Center 02',
      status: CostCenterStatus.ACTIVE,
      createdBy: user.id,
    },
    update: {},
  })
}

async function createClients(): Promise<void> {
  await prisma.client.upsert({
    where: {
      cpf: '12345678912',
    },
    create: {
      cpf: '12345678912',
      name: 'Kemuel',
    },
    update: {},
  })

  await prisma.client.upsert({
    where: {
      cpf: '12345678911',
    },
    create: {
      cpf: '12345678911',
      name: 'Kemuel',
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
