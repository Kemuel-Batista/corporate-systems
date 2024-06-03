import { FinancialSecurity, Prisma } from '@prisma/client'

export interface FinancialSecuritiesRepository {
  create(
    data: Prisma.FinancialSecurityUncheckedCreateInput,
  ): Promise<FinancialSecurity>
  findById(id: string): Promise<FinancialSecurity | null>
  listByPurchaseId(purchaseId: string): Promise<FinancialSecurity[]>
}
