import { CostCentersRepository } from '@/repositories/cost-centers-repository'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { CostCenter } from '@prisma/client'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'

interface EditCostCenterUseCaseRequest {
  id: string
  name: string
  code: string
  status: number
  updatedBy: string
}

type EditCostCenterUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    costcenter: CostCenter
  }
>

export class EditCostCenterUseCase {
  constructor(private costcentersRepository: CostCentersRepository) {}

  async execute({
    id,
    name,
    code,
    status,
    updatedBy,
  }: EditCostCenterUseCaseRequest): Promise<EditCostCenterUseCaseResponse> {
    const costcenter = await this.costcentersRepository.findById(id)

    if (!costcenter) {
      return failure(new ResourceNotFoundError())
    }

    if (costcenter.code !== code) {
      const existingCostCenter =
        await this.costcentersRepository.findByCode(code)

      if (existingCostCenter) {
        return failure(new ResourceAlreadyExistsError())
      }

      costcenter.code = code
    }

    costcenter.code = code
    costcenter.name = name
    costcenter.status = status
    costcenter.updatedBy = updatedBy

    await this.costcentersRepository.update(costcenter)

    return success({
      costcenter,
    })
  }
}
