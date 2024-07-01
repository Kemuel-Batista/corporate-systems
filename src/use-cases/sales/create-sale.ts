import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { AccountPayableMovementType } from '@/enums/account-payable-movement'
import { FinancialSecuritySituation } from '@/enums/financial-security'
import { AccountReceivableMovementsRepository } from '@/repositories/account-receivable-movements-repository'
import { ClientsRepository } from '@/repositories/clients-repository'
import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'
import { ProductsRepository } from '@/repositories/products-repository'
import { SaleDetailsRepository } from '@/repositories/sale-details-repository'
import { SalesRepository } from '@/repositories/sales-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { calculateDueDate } from '@/utils/calculate-due-date'
import { FinancialSecurity, Sale } from '@prisma/client'

interface CreateSaleUseCaseRequest {
  clientId: string
  invoiceNumber: string
  saleDate: Date
  createdBy: string
  saleDetails: {
    productId?: string
    soldAmount?: number
    unitPrice?: number
    quotes?: number
    dueAtEachTime?: number
  }[]
}

type CreateSaleUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    sale: Sale
  }
>

export class CreateSaleUseCase {
  constructor(
    private clientsRepository: ClientsRepository,
    private usersRepository: UsersRepository,
    private salesRepository: SalesRepository,
    private productsRepository: ProductsRepository,
    private saleDetailsRepository: SaleDetailsRepository,
    private financialSecuritiesRepository: FinancialSecuritiesRepository,
    private accountReceivableMovementsRepository: AccountReceivableMovementsRepository,
  ) {}

  async execute({
    clientId,
    invoiceNumber,
    saleDate,
    createdBy,
    saleDetails,
  }: CreateSaleUseCaseRequest): Promise<CreateSaleUseCaseResponse> {
    const client = await this.clientsRepository.findById(clientId)

    if (!client) {
      return failure(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.findById(createdBy)

    if (!user) {
      return failure(new ResourceNotFoundError())
    }

    const sale = await this.salesRepository.create({
      clientId,
      invoiceNumber,
      saleDate,
      createdBy,
    })

    for (const saleDetail of saleDetails) {
      const product = await this.productsRepository.findById(
        saleDetail.productId,
      )

      if (!product) {
        continue
      }

      await this.saleDetailsRepository.create({
        saleId: sale.id,
        productId: saleDetail.productId,
        soldAmount: saleDetail.soldAmount,
        unitPrice: saleDetail.unitPrice,
      })

      const quotes = saleDetail.quotes
      const dueAtEachTime = saleDetail.dueAtEachTime

      const quotaValue = (saleDetail.soldAmount * saleDetail.unitPrice) / quotes

      const quotesArray: number[] = Array.from(
        { length: quotes },
        (_, i) => i + 1,
      )
      const financialsArray: FinancialSecurity[] = []

      const now = new Date()
      let currentDueDate = now

      for (const quota of quotesArray) {
        const dueDate = calculateDueDate(currentDueDate, dueAtEachTime)

        const financialSecurity =
          await this.financialSecuritiesRepository.create({
            saleId: sale.id,
            quota,
            originalValue: quotaValue,
            invoiceNumber,
            dueDate,
            situation: FinancialSecuritySituation.PENDING,
          })

        currentDueDate = dueDate

        financialsArray.push(financialSecurity)
      }

      for (const financialSecurity of financialsArray) {
        await this.accountReceivableMovementsRepository.create({
          financialSecurityId: financialSecurity.id,
          movementDate: new Date(),
          movementType: AccountPayableMovementType.ABERTURA,
          movementValue: -saleDetail.unitPrice,
        })
      }
    }

    return success({
      sale,
    })
  }
}
