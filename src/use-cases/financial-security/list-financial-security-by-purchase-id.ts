import { Either, failure, success } from '@/core/either'
import { FinancialSecurity } from '@prisma/client'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'
import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'
import { PurchasesRepository } from '@/repositories/purchases-repository'

interface ListFinancialSecurityByPurchaseIdUseCaseRequest {
  purchaseId: string
}

type ListFinancialSecurityByPurchaseIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    financialSecurities: FinancialSecurity[]
  }
>

export class ListFinancialSecurityByPurchaseIdUseCase {
  constructor(
    private financialSecuritiesRepository: FinancialSecuritiesRepository,
    private purchasesRepository: PurchasesRepository,
  ) {}

  async execute({
    purchaseId,
  }: ListFinancialSecurityByPurchaseIdUseCaseRequest): Promise<ListFinancialSecurityByPurchaseIdUseCaseResponse> {
    const purchase = await this.purchasesRepository.findById(purchaseId)

    if (!purchase) {
      return failure(new ResourceNotFoundError())
    }

    const financialSecurities =
      await this.financialSecuritiesRepository.listByPurchaseId(purchaseId)

    return success({
      financialSecurities,
    })
  }
}
