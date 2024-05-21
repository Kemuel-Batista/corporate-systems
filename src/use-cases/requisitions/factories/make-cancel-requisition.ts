import { PrismaRequisitionsRepository } from '@/repositories/prisma/prisma-requisitions-repository'
import { CancelRequisitionUseCase } from '../cancel-requisition'

export function makeCancelRequisitionUseCase() {
  const requisitionsRepository = new PrismaRequisitionsRepository()
  const cancelRequisitionUseCase = new CancelRequisitionUseCase(
    requisitionsRepository,
  )

  return cancelRequisitionUseCase
}
