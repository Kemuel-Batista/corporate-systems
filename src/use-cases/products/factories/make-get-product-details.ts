import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { GetProductDetailsUseCase } from '../get-product-details'

export function makeGetProductDetailsUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const getProductDetailsUseCase = new GetProductDetailsUseCase(
    productsRepository,
  )

  return getProductDetailsUseCase
}
