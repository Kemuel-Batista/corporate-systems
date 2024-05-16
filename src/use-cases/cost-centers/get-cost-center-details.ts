import { Either, failure, success } from '@/core/either'
import { CostCentersRepository } from '@/repositories/cost-centers-repository'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'
import { CostCenter } from '@prisma/client'

interface GetCostCenterDetailsUseCaseRequest {
  id: string
}

type GetCostCenterDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    costcenter: CostCenter
  }
>

export class GetCostCenterDetailsUseCase {
  constructor(private costcentersRepository: CostCentersRepository) {}

  async execute({
    id,
  }: GetCostCenterDetailsUseCaseRequest): Promise<GetCostCenterDetailsUseCaseResponse> {
    const costcenter = await this.costcentersRepository.findById(id)

    if (!costcenter) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      costcenter,
    })
  }
}
