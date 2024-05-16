import { PrismaProductMovementRepository } from '@/repositories/prisma/prisma-product-movement-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { ListProductMovementByProductIdUseCase } from '../list-product-movement-by-product-id'

export function makeListProductMovementByProductIdUseCase() {
  const productMovementRepository = new PrismaProductMovementRepository()
  const productsRepository = new PrismaProductsRepository()

  const listProductMovementByProductIdUseCase =
    new ListProductMovementByProductIdUseCase(
      productMovementRepository,
      productsRepository,
    )

  return listProductMovementByProductIdUseCase
}
