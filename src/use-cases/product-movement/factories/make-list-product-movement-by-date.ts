import { PrismaProductMovementRepository } from '@/repositories/prisma/prisma-product-movement-repository'
import { ListProductMovementByDateUseCase } from '../list-product-movement-by-date'

export function makeListProductMovementByDateUseCase() {
  const productMovementRepository = new PrismaProductMovementRepository()

  const listProductMovementByDateUseCase = new ListProductMovementByDateUseCase(
    productMovementRepository,
  )

  return listProductMovementByDateUseCase
}
