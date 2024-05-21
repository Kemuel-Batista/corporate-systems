import { PrismaProductQuotesRepository } from '@/repositories/prisma/prisma-product-quotes-repository'
import { CreateProductQuoteUseCase } from '../create-product-quote'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-suppliers-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreateProductQuoteUseCase() {
  const productQuoteRepository = new PrismaProductQuotesRepository()
  const suppliersRepository = new PrismaSuppliersRepository()
  const productsRepository = new PrismaProductsRepository()
  const usersRepository = new PrismaUsersRepository()

  const createProductQuoteUseCase = new CreateProductQuoteUseCase(
    productQuoteRepository,
    suppliersRepository,
    productsRepository,
    usersRepository,
  )

  return createProductQuoteUseCase
}
