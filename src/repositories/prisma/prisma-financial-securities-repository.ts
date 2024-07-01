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

  async update({
    id,
    situation,
    invoiceNumber,
    dueDate,
    originalValue,
    purchaseId,
    quota,
  }: FinancialSecurity): Promise<void> {
    await prisma.financialSecurity.update({
      where: {
        id,
      },
      data: {
        situation: situation ?? undefined,
        invoiceNumber: invoiceNumber ?? undefined,
        dueDate: dueDate ?? undefined,
        originalValue: originalValue ?? undefined,
        purchaseId: purchaseId ?? undefined,
        quota: quota ?? undefined,
      },
    })
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

  async listBySaleId(saleId: string): Promise<FinancialSecurity[]> {
    const financialSecurities = await prisma.financialSecurity.findMany({
      where: {
        saleId,
      },
    })

    return financialSecurities
  }

  async delete(id: string): Promise<void> {
    await prisma.financialSecurity.delete({
      where: {
        id,
      },
    })
  }
}
