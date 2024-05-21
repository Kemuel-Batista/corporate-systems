import { PrismaRequisitionsRepository } from '@/repositories/prisma/prisma-requisitions-repository'
import { ListRequisitionsByProductIdUseCase } from '../list-requisitions-by-product-id'
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository'

export function makeListRequisitionsByProductIdUseCase() {
  const requisitionsRepository = new PrismaRequisitionsRepository()
  const productsRepository = new PrismaProductsRepository()

  const listRequisitionsByProductIdUseCase =
    new ListRequisitionsByProductIdUseCase(
      requisitionsRepository,
      productsRepository,
    )

  return listRequisitionsByProductIdUseCase
}
