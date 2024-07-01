import { ListFinancialSecurityBySaleIdUseCase } from '../list-financial-security-by-sale-id'
import { PrismaFinancialSecuritiesRepository } from '@/repositories/prisma/prisma-financial-securities-repository'
import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'

export function makeListFinancialSecurityBySaleIdUseCase() {
  const financialSecuritiesRepository =
    new PrismaFinancialSecuritiesRepository()
  const salesRepository = new PrismaSalesRepository()

  const listFinancialSecurityBySaleIdUseCase =
    new ListFinancialSecurityBySaleIdUseCase(
      financialSecuritiesRepository,
      salesRepository,
    )

  return listFinancialSecurityBySaleIdUseCase
}
