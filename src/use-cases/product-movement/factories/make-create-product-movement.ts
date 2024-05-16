import { PrismaProductMovementRepository } from '@/repositories/prisma/prisma-product-movement-repository'
import { CreateProductMovementUseCase } from '../create-product-movement'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { PrismaWarehousesRepository } from '@/repositories/prisma/prisma-warehouses-repository'

export function makeCreateProductMovementUseCase() {
  const productMovementRepository = new PrismaProductMovementRepository()
  const productsRepository = new PrismaProductsRepository()
  const warehousesRepository = new PrismaWarehousesRepository()

  const createProductMovementUseCase = new CreateProductMovementUseCase(
    productMovementRepository,
    productsRepository,
    warehousesRepository,
  )

  return createProductMovementUseCase
}
