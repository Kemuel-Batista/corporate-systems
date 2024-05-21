import { PrismaRequisitionsRepository } from '@/repositories/prisma/prisma-requisitions-repository'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'
import { CreateRequisitionUseCase } from '../create-requisition'
import { PrismaCostCentersRepository } from '@/repositories/prisma/prisma-cost-centers-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { PrismaProductMovementRepository } from '@/repositories/prisma/prisma-product-movement-repository'

export function makeCreateRequisitionUseCase() {
  const requisitionsRepository = new PrismaRequisitionsRepository()
  const costCentersRepository = new PrismaCostCentersRepository()
  const usersRepository = new PrismaUsersRepository()
  const productsRepository = new PrismaProductsRepository()
  const productMovementRepository = new PrismaProductMovementRepository()

  const createRequisitionUseCase = new CreateRequisitionUseCase(
    requisitionsRepository,
    costCentersRepository,
    productsRepository,
    usersRepository,
    productMovementRepository,
  )

  return createRequisitionUseCase
}
