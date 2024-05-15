import { Either, failure, success } from '@/core/either'
import { ProductsRepository } from '@/repositories/products-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { Product } from '@prisma/client'

interface GetProductDetailsUseCaseRequest {
  id: string
}

type GetProductDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

export class GetProductDetailsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: GetProductDetailsUseCaseRequest): Promise<GetProductDetailsUseCaseResponse> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      product,
    })
  }
}
