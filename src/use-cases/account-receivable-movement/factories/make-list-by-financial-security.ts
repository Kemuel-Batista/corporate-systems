import { PrismaAccountReceivableMovementsRepository } from '@/repositories/prisma/prisma-account-receivable-movements-repository'
import { PrismaFinancialSecuritiesRepository } from '@/repositories/prisma/prisma-financial-securities-repository'
import { ListAccountReceivableMovementByFinancialSecurityIdUseCase } from '../list-by-financial-security-id'

export function makeListAccountReceivableMovementByFinancialSecurityIdUseCase() {
  const accountReceivableMovementsRepository =
    new PrismaAccountReceivableMovementsRepository()
  const financialSecuritiesRepository =
    new PrismaFinancialSecuritiesRepository()

  const listAccountReceivableMovementByFinancialSecurityIdUseCase =
    new ListAccountReceivableMovementByFinancialSecurityIdUseCase(
      accountReceivableMovementsRepository,
      financialSecuritiesRepository,
    )

  return listAccountReceivableMovementByFinancialSecurityIdUseCase
}
