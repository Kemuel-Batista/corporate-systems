import { Either, failure, success } from '@/core/either'
import { FinancialSecurity } from '@prisma/client'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'
import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'
import { SalesRepository } from '@/repositories/sales-repository'

interface ListFinancialSecurityBySaleIdUseCaseRequest {
  saleId: string
}

type ListFinancialSecurityBySaleIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    financialSecurities: FinancialSecurity[]
  }
>

export class ListFinancialSecurityBySaleIdUseCase {
  constructor(
    private financialSecuritiesRepository: FinancialSecuritiesRepository,
    private salesRepository: SalesRepository,
  ) {}

  async execute({
    saleId,
  }: ListFinancialSecurityBySaleIdUseCaseRequest): Promise<ListFinancialSecurityBySaleIdUseCaseResponse> {
    const sale = await this.salesRepository.findById(saleId)

    if (!sale) {
      return failure(new ResourceNotFoundError())
    }

    const financialSecurities =
      await this.financialSecuritiesRepository.listBySaleId(saleId)

    return success({
      financialSecurities,
    })
  }
}
