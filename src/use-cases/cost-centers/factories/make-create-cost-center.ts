import { PrismaCostCentersRepository } from '@/repositories/prisma/prisma-cost-centers-repository'
import { CreateCostCenterUseCase } from '../create-cost-center'

export function makeCreateCostCenterUseCase() {
  const costcentersRepository = new PrismaCostCentersRepository()
  const createCostCenterUseCase = new CreateCostCenterUseCase(
    costcentersRepository,
  )

  return createCostCenterUseCase
}
