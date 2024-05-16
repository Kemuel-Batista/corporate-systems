import { ProductsRepository } from '@/repositories/products-repository'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { Product } from '@prisma/client'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'

interface EditProductUseCaseRequest {
  id: string
  name: string
  description: string
  status: number
  updatedBy: string
}

type EditProductUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

export class EditProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    id,
    name,
    description,
    status,
    updatedBy,
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    if (product.name !== name) {
      const existingProduct = await this.productsRepository.findByName(name)

      if (existingProduct) {
        return failure(new ResourceAlreadyExistsError())
      }

      product.name = name
    }

    product.description = description
    product.status = status
    product.updatedBy = updatedBy

    await this.productsRepository.update(product)

    return success({
      product,
    })
  }
}
