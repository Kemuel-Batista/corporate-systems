import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { FinancialSecuritySituation } from '@/enums/financial-security'
import { AccountPayableMovementsRepository } from '@/repositories/account-payable-movements-repository'
import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'

interface CreateAccountPayableMovementUseCaseRequest {
  financialSecurityId: string
  movementDate: Date
  movementType: number
  movementValue: number
}

type CreateAccountPayableMovementUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

export class CreateAccountPayableMovementUseCase {
  constructor(
    private accountPayableMovementsRepository: AccountPayableMovementsRepository,
    private financialSecuritiesRepository: FinancialSecuritiesRepository,
  ) {}

  async execute({
    financialSecurityId,
    movementDate,
    movementType,
    movementValue,
  }: CreateAccountPayableMovementUseCaseRequest): Promise<CreateAccountPayableMovementUseCaseResponse> {
    const financialSecurity =
      await this.financialSecuritiesRepository.findById(financialSecurityId)

    if (!financialSecurity) {
      return failure(new ResourceNotFoundError())
    }

    await this.accountPayableMovementsRepository.create({
      financialSecurityId,
      movementDate,
      movementType,
      movementValue,
    })

    if (movementValue === financialSecurity.originalValue) {
      financialSecurity.situation = FinancialSecuritySituation.COMPLETED
    }

    await this.financialSecuritiesRepository.update(financialSecurity)

    return success(null)
  }
}
