import { FinancialSecuritiesRepository } from '@/repositories/financial-securities-repository'
import { FinancialSecurity, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryFinancialSecuritiesRepository
  implements FinancialSecuritiesRepository
{
  public items: FinancialSecurity[] = []

  async create(
    data: Prisma.FinancialSecurityUncheckedCreateInput,
  ): Promise<FinancialSecurity> {
    const financialSecurity = {
      id: randomUUID(),
      purchaseId: data.purchaseId,
      invoiceNumber: data.invoiceNumber,
      quota: data.quota,
      originalValue: data.originalValue,
      dueDate: new Date(data.dueDate),
      situation: data.situation,
      createdAt: new Date(),
    }

    this.items.push(financialSecurity)

    return financialSecurity
  }

  async findById(id: string): Promise<FinancialSecurity | null> {
    const financialSecurity = this.items.find((item) => item.id === id)

    if (!financialSecurity) {
      return null
    }

    return financialSecurity
  }

  async listByPurchaseId(purchaseId: string): Promise<FinancialSecurity[]> {
    const financialSecurities = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.purchaseId === purchaseId)

    return financialSecurities
  }
}
