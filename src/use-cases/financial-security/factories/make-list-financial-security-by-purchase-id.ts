import { ListFinancialSecurityByPurchaseIdUseCase } from '../list-financial-security-by-purchase-id'
import { PrismaFinancialSecuritiesRepository } from '@/repositories/prisma/prisma-financial-securities-repository'
import { PrismaPurchasesRepository } from '@/repositories/prisma/prisma-purchases-repository'

export function makeListFinancialSecurityByPurchaseIdUseCase() {
  const financialSecuritiesRepository =
    new PrismaFinancialSecuritiesRepository()
  const purchasesRepository = new PrismaPurchasesRepository()

  const listFinancialSecurityByPurchaseIdUseCase =
    new ListFinancialSecurityByPurchaseIdUseCase(
      financialSecuritiesRepository,
      purchasesRepository,
    )

  return listFinancialSecurityByPurchaseIdUseCase
}
