import { Purchase, Prisma } from '@prisma/client'
import { PurchasesRepository } from '../../src/repositories/purchases-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPurchasesRepository implements PurchasesRepository {
  public items: Purchase[] = []

  async create(data: Prisma.PurchaseUncheckedCreateInput): Promise<Purchase> {
    const purchase = {
      id: randomUUID(),
      buyerId: data.buyerId,
      productId: data.productId,
      productQuoteId: data.productQuoteId,
      supplierId: data.supplierId,
      quantity: data.quantity,
      status: data.status,
      unitCost: data.unitCost,
      quotes: data.quotes,
      invoiceNumber: data.invoiceNumber,
      createdAt: new Date(),
    }

    this.items.push(purchase)

    return purchase
  }

  async update(data: Purchase): Promise<Purchase> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const purchase = this.items[itemIndex]

    const purchaseUpdated = {
      ...purchase,
      status: data.status,
    }

    this.items[itemIndex] = purchaseUpdated

    return purchase
  }

  async findById(id: string): Promise<Purchase | null> {
    const purchase = this.items.find((item) => item.id === id)

    if (!purchase) {
      return null
    }

    return purchase
  }
}
