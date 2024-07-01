import { Either, failure } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'

interface CancelFinancialSecurityUseCaseRequest {
  financialSecurityId: string
}

type CancelFinancialSecurityUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

export class CancelFinancialSecurityUseCase {
  constructor(
    private financialSecuritiesRepository: FinancialSecuritiesRepository,
  ) {}

  async execute({
    financialSecurityId,
  }: CancelFinancialSecurityUseCaseRequest): Promise<CancelFinancialSecurityUseCaseResponse> {
    const financialSecurity =
      await this.financialSecuritiesRepository.findById(financialSecurityId)

    if (!financialSecurity) {
      return failure(new ResourceNotFoundError())
    }

    await this.financialSecuritiesRepository.delete(financialSecurityId)
  }
}
