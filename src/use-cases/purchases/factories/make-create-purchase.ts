import { PrismaPurchasesRepository } from '@/repositories/prisma/prisma-purchases-repository'
import { CreatePurchaseUseCase } from '../create-purchase'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { PrismaProductQuotesRepository } from '@/repositories/prisma/prisma-product-quotes-repository'
import { PrismaSuppliersRepository } from '@/repositories/prisma/prisma-suppliers-repository'

export function makeCreatePurchaseUseCase() {
  const purchasesRepository = new PrismaPurchasesRepository()
  const usersRepository = new PrismaUsersRepository()
  const productsRepository = new PrismaProductsRepository()
  const productQuotesRepository = new PrismaProductQuotesRepository()
  const suppliersRepository = new PrismaSuppliersRepository()

  const createPurchaseUseCase = new CreatePurchaseUseCase(
    purchasesRepository,
    usersRepository,
    productsRepository,
    productQuotesRepository,
    suppliersRepository,
  )

  return createPurchaseUseCase
}
