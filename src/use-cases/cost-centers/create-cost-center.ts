import { CostCentersRepository } from '@/repositories/cost-centers-repository'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { CostCenter } from '@prisma/client'
import { Either, failure, success } from '@/core/either'

interface CreateCostCenterUseCaseRequest {
  name: string
  code: string
  status: number
  createdBy: string
}

type CreateCostCenterUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    costcenter: CostCenter
  }
>

export class CreateCostCenterUseCase {
  constructor(private costcentersRepository: CostCentersRepository) {}

  async execute({
    name,
    code,
    status,
    createdBy,
  }: CreateCostCenterUseCaseRequest): Promise<CreateCostCenterUseCaseResponse> {
    const costcenterAlreadyExists =
      await this.costcentersRepository.findByCode(code)

    if (costcenterAlreadyExists) {
      return failure(new ResourceAlreadyExistsError())
    }

    const costcenter = await this.costcentersRepository.create({
      name,
      code,
      status,
      createdBy,
    })

    return success({
      costcenter,
    })
  }
}
