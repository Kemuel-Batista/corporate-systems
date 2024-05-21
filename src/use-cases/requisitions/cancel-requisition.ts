import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { RequisitionsRepository } from '@/repositories/requisitions-repository'

interface CancelRequisitionUseCaseRequest {
  id: string
}

type CancelRequisitionUseCaseResponse = Either<ResourceNotFoundError, null>

export class CancelRequisitionUseCase {
  constructor(private requisitionsRepository: RequisitionsRepository) {}

  async execute({
    id,
  }: CancelRequisitionUseCaseRequest): Promise<CancelRequisitionUseCaseResponse> {
    const requisition = await this.requisitionsRepository.findById(id)

    if (!requisition) {
      return failure(new ResourceNotFoundError())
    }

    await this.requisitionsRepository.cancel(id)

    return success(null)
  }
}
