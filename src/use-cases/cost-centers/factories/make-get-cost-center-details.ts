import { PrismaCostCentersRepository } from '@/repositories/prisma/prisma-cost-centers-repository'
import { GetCostCenterDetailsUseCase } from '../get-cost-center-details'

export function makeGetCostCenterDetailsUseCase() {
  const costcentersRepository = new PrismaCostCentersRepository()
  const getCostCenterDetailsUseCase = new GetCostCenterDetailsUseCase(
    costcentersRepository,
  )

  return getCostCenterDetailsUseCase
}
