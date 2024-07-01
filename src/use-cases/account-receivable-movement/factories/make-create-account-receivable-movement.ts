import { PrismaAccountReceivableMovementsRepository } from '@/repositories/prisma/prisma-account-receivable-movements-repository'
import { PrismaFinancialSecuritiesRepository } from '@/repositories/prisma/prisma-financial-securities-repository'
import { CreateAccountReceivableMovementUseCase } from '../create-account-receivable-movement'

export function makeCreateAccountReceivableMovementUseCase() {
  const accountReceivableMovementsRepository =
    new PrismaAccountReceivableMovementsRepository()
  const financialSecuritiesRepository =
    new PrismaFinancialSecuritiesRepository()

  const createAccountReceivableMovementUseCase =
    new CreateAccountReceivableMovementUseCase(
      accountReceivableMovementsRepository,
      financialSecuritiesRepository,
    )

  return createAccountReceivableMovementUseCase
}
