import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { ProductQuotesRepository } from '@/repositories/product-quotes-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { SuppliersRepository } from '@/repositories/suppliers-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ProductQuote } from '@prisma/client'

interface CreateProductQuoteUseCaseRequest {
  productId: string
  supplierId: string
  price: number
  quoteDate: Date
  buyerId: string
  expirationDate: Date
}

type CreateProductQuoteUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    productQuote: ProductQuote
  }
>

export class CreateProductQuoteUseCase {
  constructor(
    private productQuotesRepository: ProductQuotesRepository,
    private suppliersRepository: SuppliersRepository,
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    productId,
    supplierId,
    price,
    quoteDate,
    buyerId,
    expirationDate,
  }: CreateProductQuoteUseCaseRequest): Promise<CreateProductQuoteUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      return failure(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.findById(buyerId)

    if (!user) {
      return failure(new ResourceNotFoundError())
    }

    const productQuote = await this.productQuotesRepository.create({
      buyerId,
      supplierId,
      productId,
      price,
      quoteDate,
      expirationDate,
    })

    return success({
      productQuote,
    })
  }
}
