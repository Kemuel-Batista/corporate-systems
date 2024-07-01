import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { AccountReceivableMovementsRepository } from '@/repositories/account-receivable-movements-repository'
import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'
import { AccountReceivableMovement } from '@prisma/client'

interface ListAccountReceivableMovementByFinancialSecurityIdUseCaseRequest {
  financialSecurityId: string
}

type ListAccountReceivableMovementByFinancialSecurityIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    accountReceivableMovements: AccountReceivableMovement[]
  }
>

export class ListAccountReceivableMovementByFinancialSecurityIdUseCase {
  constructor(
    private accountReceivableMovementRepository: AccountReceivableMovementsRepository,
    private financialSecuritiesRepository: FinancialSecuritiesRepository,
  ) {}

  async execute({
    financialSecurityId,
  }: ListAccountReceivableMovementByFinancialSecurityIdUseCaseRequest): Promise<ListAccountReceivableMovementByFinancialSecurityIdUseCaseResponse> {
    const financialSecurity =
      await this.financialSecuritiesRepository.findById(financialSecurityId)

    if (!financialSecurity) {
      return failure(new ResourceNotFoundError())
    }

    const accountReceivableMovements =
      await this.accountReceivableMovementRepository.listByFinancialSecurityId(
        financialSecurityId,
      )

    return success({
      accountReceivableMovements,
    })
  }
}
