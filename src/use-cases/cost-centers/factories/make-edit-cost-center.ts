import { PrismaCostCentersRepository } from '@/repositories/prisma/prisma-cost-centers-repository'
import { EditCostCenterUseCase } from '../edit-cost-center'

export function makeEditCostCenterUseCase() {
  const costcentersRepository = new PrismaCostCentersRepository()
  const editCostCenterUseCase = new EditCostCenterUseCase(costcentersRepository)

  return editCostCenterUseCase
}
