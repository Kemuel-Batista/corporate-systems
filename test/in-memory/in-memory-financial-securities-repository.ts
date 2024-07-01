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
      saleId: data.saleId,
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

  async update(data: FinancialSecurity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const financialSecurity = this.items[itemIndex]

    const financialSecurityUpdated = {
      ...financialSecurity,
      situation: data.situation,
      invoiceNumber: data.invoiceNumber,
      dueDate: data.dueDate,
      originalValue: data.originalValue,
      purchaseId: data.purchaseId,
      quota: data.quota,
    }

    this.items[itemIndex] = financialSecurityUpdated
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

  async listBySaleId(saleId: string): Promise<FinancialSecurity[]> {
    const financialSecurities = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.saleId === saleId)

    return financialSecurities
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
