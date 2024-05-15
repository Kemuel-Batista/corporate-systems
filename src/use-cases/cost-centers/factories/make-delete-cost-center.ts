import { PrismaCostCentersRepository } from '@/repositories/prisma/prisma-cost-centers-repository'
import { DeleteCostCenterUseCase } from '../delete-cost-center'

export function makeDeleteCostCenterUseCase() {
  const costcentersRepository = new PrismaCostCentersRepository()
  const deleteCostCenterUseCase = new DeleteCostCenterUseCase(
    costcentersRepository,
  )

  return deleteCostCenterUseCase
}
