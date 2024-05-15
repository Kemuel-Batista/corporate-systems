import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { ListProductsUseCase } from '../list-product'

export function makeListProductsUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const listProductsUseCase = new ListProductsUseCase(productsRepository)

  return listProductsUseCase
}
