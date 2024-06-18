import { PrismaProductQuotesRepository } from '@/repositories/prisma/prisma-product-quotes-repository'
import { ListProductQuotesByProductIdUseCase } from '../list-product-quotes-by-product-id'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

export function makeListProductQuotesByProductIdUseCase() {
  const productQuoteRepository = new PrismaProductQuotesRepository()
  const productsRepository = new PrismaProductsRepository()

  const listProductQuotesByProductIdUseCase =
    new ListProductQuotesByProductIdUseCase(
      productQuoteRepository,
      productsRepository,
    )

  return listProductQuotesByProductIdUseCase
}
