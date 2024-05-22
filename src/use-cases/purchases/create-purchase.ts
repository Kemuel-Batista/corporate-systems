import { Either, failure, success } from '@/core/either'
import { MinimumNumberOfQuotesIsNotEnoughError } from '@/core/errors/minimum-number-of-quotes-is-not-enough-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { PurchaseStatus } from '@/enums/purchase'
import { ProductQuotesRepository } from '@/repositories/product-quotes-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { PurchasesRepository } from '@/repositories/purchases-repository'
import { SuppliersRepository } from '@/repositories/suppliers-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Purchase } from '@prisma/client'

interface CreatePurchaseUseCaseRequest {
  supplierId: string
  productId: string
  productQuoteId: string
  buyerId: string
  quantity: number
  unitCost: number
  quotes: number
  invoiceNumber: string
}

type CreatePurchaseUseCaseResponse = Either<
  ResourceNotFoundError | MinimumNumberOfQuotesIsNotEnoughError,
  {
    purchase: Purchase
  }
>

export class CreatePurchaseUseCase {
  constructor(
    private purchasesRepository: PurchasesRepository,
    private usersRepository: UsersRepository,
    private productsRepository: ProductsRepository,
    private productQuotesRepository: ProductQuotesRepository,
    private suppliersRepository: SuppliersRepository,
  ) {}

  async execute({
    buyerId,
    productId,
    productQuoteId,
    quantity,
    unitCost,
    supplierId,
    quotes,
    invoiceNumber,
  }: CreatePurchaseUseCaseRequest): Promise<CreatePurchaseUseCaseResponse> {
    const user = await this.usersRepository.findById(buyerId)

    if (!user) {
      return failure(new ResourceNotFoundError())
    }

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return failure(new ResourceNotFoundError())
    }

    const productQuote =
      await this.productQuotesRepository.findById(productQuoteId)

    if (!productQuote) {
      return failure(new ResourceNotFoundError())
    }

    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      return failure(new ResourceNotFoundError())
    }

    const productQuotesQuantity =
      await this.productQuotesRepository.listByProductId(productId)

    if (productQuotesQuantity.length < 3) {
      return failure(new MinimumNumberOfQuotesIsNotEnoughError())
    }

    const purchase = await this.purchasesRepository.create({
      buyerId,
      productId,
      productQuoteId,
      quantity,
      status: PurchaseStatus.PENDING,
      supplierId,
      unitCost,
      quotes,
      invoiceNumber,
    })

    return success({
      purchase,
    })
  }
}
