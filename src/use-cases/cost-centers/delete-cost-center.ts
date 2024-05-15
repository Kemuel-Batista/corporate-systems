import { Either, failure, success } from '@/core/either'
import { CostCentersRepository } from '@/repositories/cost-centers-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteCostCenterUseCaseRequest {
  id: string
}

type DeleteCostCenterUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteCostCenterUseCase {
  constructor(private costcentersRepository: CostCentersRepository) {}

  async execute({
    id,
  }: DeleteCostCenterUseCaseRequest): Promise<DeleteCostCenterUseCaseResponse> {
    const costcenter = await this.costcentersRepository.findById(id)

    if (!costcenter) {
      return failure(new ResourceNotFoundError())
    }

    await this.costcentersRepository.delete(id)

    return success(null)
  }
}
