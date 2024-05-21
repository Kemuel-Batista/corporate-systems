import { PrismaRequisitionsRepository } from '@/repositories/prisma/prisma-requisitions-repository'
import { ListRequisitionsUseCase } from '../list-requisitions'

export function makeListRequisitionsUseCase() {
  const requisitionsRepository = new PrismaRequisitionsRepository()

  const listRequisitionsUseCase = new ListRequisitionsUseCase(
    requisitionsRepository,
  )

  return listRequisitionsUseCase
}
