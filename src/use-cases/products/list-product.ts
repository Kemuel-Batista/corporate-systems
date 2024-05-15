import { Either, success } from '@/core/either'
import { ProductsRepository } from '@/repositories/products-repository'
import { Product } from '@prisma/client'

type ListProductsUseCaseResponse = Either<
  null,
  {
    products: Product[]
  }
>

export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<ListProductsUseCaseResponse> {
    const products = await this.productsRepository.list()

    return success({
      products,
    })
  }
}
