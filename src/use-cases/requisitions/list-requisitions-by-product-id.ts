import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ProductsRepository } from '@/repositories/products-repository'
import { RequisitionsRepository } from '@/repositories/requisitions-repository'
import { Requisition } from '@prisma/client'

interface ListRequisitionsByProductIdUseCaseRequest {
  productId: string
}

type ListRequisitionsByProductIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    requisitions: Requisition[]
  }
>

export class ListRequisitionsByProductIdUseCase {
  constructor(
    private requisitionsRepository: RequisitionsRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    productId,
  }: ListRequisitionsByProductIdUseCaseRequest): Promise<ListRequisitionsByProductIdUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    const requisitions =
      await this.requisitionsRepository.listByProductId(productId)

    return success({
      requisitions,
    })
  }
}
