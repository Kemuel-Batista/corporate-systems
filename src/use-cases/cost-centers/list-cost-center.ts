import { Either, success } from '@/core/either'
import { CostCentersRepository } from '@/repositories/cost-centers-repository'
import { CostCenter } from '@prisma/client'

type ListCostCentersUseCaseResponse = Either<
  null,
  {
    costcenters: CostCenter[]
  }
>

export class ListCostCentersUseCase {
  constructor(private costcentersRepository: CostCentersRepository) {}

  async execute(): Promise<ListCostCentersUseCaseResponse> {
    const costcenters = await this.costcentersRepository.list()

    return success({
      costcenters,
    })
  }
}
