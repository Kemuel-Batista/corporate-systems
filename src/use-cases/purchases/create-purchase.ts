import { Either, failure, success } from '@/core/either'
import { MinimumNumberOfQuotesIsNotEnoughError } from '@/core/errors/minimum-number-of-quotes-is-not-enough-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { AccountPayableMovementType } from '@/enums/account-payable-movement'
import { FinancialSecuritySituation } from '@/enums/financial-security'
import { PurchaseStatus } from '@/enums/purchase'
import { AccountPayableMovementsRepository } from '@/repositories/account-payable-movements-repository'
import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'
import { ProductQuotesRepository } from '@/repositories/product-quotes-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { PurchasesRepository } from '@/repositories/purchases-repository'
import { SuppliersRepository } from '@/repositories/suppliers-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { calculateDueDate } from '@/utils/calculate-due-date'
import { FinancialSecurity, Purchase } from '@prisma/client'

interface CreatePurchaseUseCaseRequest {
  supplierId: string
  productId: string
  productQuoteId: string
  buyerId: string
  quantity: number
  unitCost: number
  quotes: number
  invoiceNumber: string
  dueAtEachTime: number
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
    private financialSecuritiesRepository: FinancialSecuritiesRepository,
    private accountPayableMovementsRepository: AccountPayableMovementsRepository,
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
    dueAtEachTime,
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

    const quotaValue = (quantity * unitCost) / quotes

    const quotesArray: number[] = Array.from(
      { length: quotes },
      (_, i) => i + 1,
    )
    const financialsArray: FinancialSecurity[] = []

    const now = new Date()
    let currentDueDate = now

    for (const quota of quotesArray) {
      const dueDate = calculateDueDate(currentDueDate, dueAtEachTime)

      const financialSecurity = await this.financialSecuritiesRepository.create(
        {
          purchaseId: purchase.id,
          quota,
          originalValue: quotaValue,
          invoiceNumber,
          dueDate,
          situation: FinancialSecuritySituation.PENDING,
        },
      )

      currentDueDate = dueDate

      financialsArray.push(financialSecurity)
    }

    for (const financialSecurity of financialsArray) {
      await this.accountPayableMovementsRepository.create({
        financialSecurityId: financialSecurity.id,
        movementDate: new Date(),
        movementType: AccountPayableMovementType.ABERTURA,
        movementValue: unitCost,
      })
    }

    return success({
      purchase,
    })
  }
}
