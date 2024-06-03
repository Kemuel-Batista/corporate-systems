import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { AccountPayableMovementsRepository } from '@/repositories/account-payable-movements-repository'
import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'
import { AccountPayableMovement } from '@prisma/client'

interface ListAccountPayableMovementByFinancialSecurityIdUseCaseRequest {
  financialSecurityId: string
}

type ListAccountPayableMovementByFinancialSecurityIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    accountPayableMovements: AccountPayableMovement[]
  }
>

export class ListAccountPayableMovementByFinancialSecurityIdUseCase {
  constructor(
    private accountPayableMovementRepository: AccountPayableMovementsRepository,
    private financialSecuritiesRepository: FinancialSecuritiesRepository,
  ) {}

  async execute({
    financialSecurityId,
  }: ListAccountPayableMovementByFinancialSecurityIdUseCaseRequest): Promise<ListAccountPayableMovementByFinancialSecurityIdUseCaseResponse> {
    const financialSecurity =
      await this.financialSecuritiesRepository.findById(financialSecurityId)

    if (!financialSecurity) {
      return failure(new ResourceNotFoundError())
    }

    const accountPayableMovements =
      await this.accountPayableMovementRepository.listByFinancialSecurityId(
        financialSecurityId,
      )

    return success({
      accountPayableMovements,
    })
  }
}
