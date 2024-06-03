import { prisma } from '@/lib/prisma'
import { FinancialSecuritiesRepository } from '../financial-securities-repository'
import { FinancialSecurity, Prisma } from '@prisma/client'

export class PrismaFinancialSecuritiesRepository
  implements FinancialSecuritiesRepository
{
  async create({
    purchaseId,
    invoiceNumber,
    quota,
    originalValue,
    dueDate,
    situation,
  }: Prisma.FinancialSecurityUncheckedCreateInput): Promise<FinancialSecurity> {
    const financialSecurity = await prisma.financialSecurity.create({
      data: {
        purchaseId,
        invoiceNumber,
        quota,
        originalValue,
        dueDate,
        situation,
      },
    })
    return financialSecurity
  }

  async findById(id: string): Promise<FinancialSecurity | null> {
    const financialSecurity = await prisma.financialSecurity.findUnique({
      where: {
        id,
      },
    })

    return financialSecurity
  }

  async listByPurchaseId(purchaseId: string): Promise<FinancialSecurity[]> {
    const financialSecurities = await prisma.financialSecurity.findMany({
      where: {
        purchaseId,
      },
    })

    return financialSecurities
  }
}
