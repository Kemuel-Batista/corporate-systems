import { PrismaAccountPayableMovementsRepository } from '@/repositories/prisma/prisma-account-payable-movements-repository'
import { PrismaFinancialSecuritiesRepository } from '@/repositories/prisma/prisma-financial-securities-repository'
import { ListAccountPayableMovementByFinancialSecurityIdUseCase } from '../list-by-financial-security-id'

export function makeListAccountPayableMovementByFinancialSecurityIdUseCase() {
  const accountPayableMovementsRepository =
    new PrismaAccountPayableMovementsRepository()
  const financialSecuritiesRepository =
    new PrismaFinancialSecuritiesRepository()

  const listAccountPayableMovementByFinancialSecurityIdUseCase =
    new ListAccountPayableMovementByFinancialSecurityIdUseCase(
      accountPayableMovementsRepository,
      financialSecuritiesRepository,
    )

  return listAccountPayableMovementByFinancialSecurityIdUseCase
}
