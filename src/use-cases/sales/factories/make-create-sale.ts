import { CreateSaleUseCase } from '../create-sale'
import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { PrismaSaleDetailsRepository } from '@/repositories/prisma/prisma-sale-details-repository'

export function makeCreateSaleUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const usersRepository = new PrismaUsersRepository()
  const salesRepository = new PrismaSalesRepository()
  const productsRepository = new PrismaProductsRepository()
  const saleDetailsRepository = new PrismaSaleDetailsRepository()

  const createSaleUseCase = new CreateSaleUseCase(
    clientsRepository,
    usersRepository,
    salesRepository,
    productsRepository,
    saleDetailsRepository,
  )

  return createSaleUseCase
}
