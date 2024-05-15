import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { EditProductUseCase } from '../edit-product'

export function makeEditProductUseCase() {
  const productsRepository = new PrismaProductsRepository()
  const editProductUseCase = new EditProductUseCase(productsRepository)

  return editProductUseCase
}
