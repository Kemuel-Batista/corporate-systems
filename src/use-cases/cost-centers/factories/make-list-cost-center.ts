import { PrismaCostCentersRepository } from '@/repositories/prisma/prisma-cost-centers-repository'
import { ListCostCentersUseCase } from '../list-cost-center'

export function makeListCostCentersUseCase() {
  const costcentersRepository = new PrismaCostCentersRepository()
  const listCostCentersUseCase = new ListCostCentersUseCase(
    costcentersRepository,
  )

  return listCostCentersUseCase
}
