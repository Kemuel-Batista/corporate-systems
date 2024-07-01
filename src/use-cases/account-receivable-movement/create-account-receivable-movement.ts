import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { FinancialSecuritySituation } from '@/enums/financial-security'
import { AccountReceivableMovementsRepository } from '@/repositories/account-receivable-movements-repository'
import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'

interface CreateAccountReceivableMovementUseCaseRequest {
  financialSecurityId: string
  movementDate: Date
  movementType: number
  movementValue: number
}

type CreateAccountReceivableMovementUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

export class CreateAccountReceivableMovementUseCase {
  constructor(
    private accountReceivableMovementsRepository: AccountReceivableMovementsRepository,
    private financialSecuritiesRepository: FinancialSecuritiesRepository,
  ) {}

  async execute({
    financialSecurityId,
    movementDate,
    movementType,
    movementValue,
  }: CreateAccountReceivableMovementUseCaseRequest): Promise<CreateAccountReceivableMovementUseCaseResponse> {
    const financialSecurity =
      await this.financialSecuritiesRepository.findById(financialSecurityId)

    if (!financialSecurity) {
      return failure(new ResourceNotFoundError())
    }

    await this.accountReceivableMovementsRepository.create({
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
