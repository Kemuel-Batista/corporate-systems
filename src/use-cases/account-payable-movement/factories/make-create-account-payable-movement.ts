import { PrismaAccountPayableMovementsRepository } from '@/repositories/prisma/prisma-account-payable-movements-repository'
import { PrismaFinancialSecuritiesRepository } from '@/repositories/prisma/prisma-financial-securities-repository'
import { CreateAccountPayableMovementUseCase } from '../create-account-payable-movement'

export function makeCreateAccountPayableMovementUseCase() {
  const accountPayableMovementsRepository =
    new PrismaAccountPayableMovementsRepository()
  const financialSecuritiesRepository =
    new PrismaFinancialSecuritiesRepository()

  const createAccountPayableMovementUseCase =
    new CreateAccountPayableMovementUseCase(
      accountPayableMovementsRepository,
      financialSecuritiesRepository,
    )

  return createAccountPayableMovementUseCase
}
