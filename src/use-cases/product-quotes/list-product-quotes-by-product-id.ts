import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ProductQuotesRepository } from '@/repositories/product-quotes-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { ProductQuote } from '@prisma/client'

interface ListProductQuotesByProductIdUseCaseRequest {
  productId: string
}

type ListProductQuotesByProductIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    productQuotes: ProductQuote[]
  }
>

export class ListProductQuotesByProductIdUseCase {
  constructor(
    private productQuotesRepository: ProductQuotesRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async execute({
    productId,
  }: ListProductQuotesByProductIdUseCaseRequest): Promise<ListProductQuotesByProductIdUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    const productQuotes =
      await this.productQuotesRepository.listByProductId(productId)

    return success({
      productQuotes,
    })
  }
}
