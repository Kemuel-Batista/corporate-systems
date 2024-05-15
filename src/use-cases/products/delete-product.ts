import { Either, failure, success } from '@/core/either'
import { ProductsRepository } from '@/repositories/products-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteProductUseCaseRequest {
  id: string
}

type DeleteProductUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
  }: DeleteProductUseCaseRequest): Promise<DeleteProductUseCaseResponse> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    await this.productsRepository.delete(id)

    return success(null)
  }
}
