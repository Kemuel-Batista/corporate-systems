import { ProductsRepository } from '@/repositories/products-repository'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { Product } from '@prisma/client'
import { Either, failure, success } from '@/core/either'

interface CreateProductUseCaseRequest {
  name: string
  description: string
  status: number
  createdBy: string
}

type CreateProductUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    product: Product
  }
>

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    description,
    status,
    createdBy,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const productAlreadyExists = await this.productsRepository.findByName(name)

    if (productAlreadyExists) {
      return failure(new ResourceAlreadyExistsError())
    }

    const product = await this.productsRepository.create({
      name,
      description,
      status,
      createdBy,
    })

    return success({
      product,
    })
  }
}
