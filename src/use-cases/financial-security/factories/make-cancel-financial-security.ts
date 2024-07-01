import { PrismaFinancialSecuritiesRepository } from '@/repositories/prisma/prisma-financial-securities-repository'
import { CancelFinancialSecurityUseCase } from '../cancel-financial-security'

export function makeCancelFinancialSecurityUseCase() {
  const financialSecuritiesRepository =
    new PrismaFinancialSecuritiesRepository()

  const cancelFinancialSecurityUseCase = new CancelFinancialSecurityUseCase(
    financialSecuritiesRepository,
  )

  return cancelFinancialSecurityUseCase
}
