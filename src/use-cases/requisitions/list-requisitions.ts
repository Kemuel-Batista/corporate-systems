import { Either, success } from '@/core/either'
import { RequisitionsRepository } from '@/repositories/requisitions-repository'
import { Requisition } from '@prisma/client'

type ListRequisitionsUseCaseResponse = Either<
  null,
  {
    requisitions: Requisition[]
  }
>

export class ListRequisitionsUseCase {
  constructor(private requisitionsRepository: RequisitionsRepository) {}

  async execute(): Promise<ListRequisitionsUseCaseResponse> {
    const requisitions = await this.requisitionsRepository.list()

    return success({
      requisitions,
    })
  }
}
