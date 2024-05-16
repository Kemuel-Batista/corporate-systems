import { Either, success } from '@/core/either'
import { ProductMovementRepository } from '@/repositories/product-movement-repository'
import { ProductMovement } from '@prisma/client'

interface ListProductMovementByDateUseCaseRequest {
  initialDate: Date
  finalDate: Date
}

type ListProductMovementByDateUseCaseResponse = Either<
  null,
  {
    productMovement: ProductMovement[]
  }
>

export class ListProductMovementByDateUseCase {
  constructor(private productMovementRepository: ProductMovementRepository) {}

  async execute({
    initialDate,
    finalDate,
  }: ListProductMovementByDateUseCaseRequest): Promise<ListProductMovementByDateUseCaseResponse> {
    const productMovement = await this.productMovementRepository.listByDate(
      initialDate,
      finalDate,
    )

    return success({
      productMovement,
    })
  }
}
