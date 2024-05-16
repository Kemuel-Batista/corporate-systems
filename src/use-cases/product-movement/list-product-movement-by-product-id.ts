import { Either, failure, success } from '@/core/either'
import { ProductMovementRepository } from '@/repositories/product-movement-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { ProductMovement } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ListProductMovementByProductIdUseCaseRequest {
  productId: string
}

type ListProductMovementByProductIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    productMovement: ProductMovement[]
  }
>

export class ListProductMovementByProductIdUseCase {
  constructor(
    private productMovementRepository: ProductMovementRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    productId,
  }: ListProductMovementByProductIdUseCaseRequest): Promise<ListProductMovementByProductIdUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    const productMovement =
      await this.productMovementRepository.listByProductId(productId)

    return success({
      productMovement,
    })
  }
}
