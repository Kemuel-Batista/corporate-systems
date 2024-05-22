import { Purchase, Prisma } from '@prisma/client'
import { PurchasesRepository } from '../purchases-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPurchasesRepository implements PurchasesRepository {
  async create({
    buyerId,
    productId,
    productQuoteId,
    supplierId,
    quantity,
    status,
    unitCost,
    quotes,
    invoiceNumber,
  }: Prisma.PurchaseUncheckedCreateInput): Promise<Purchase> {
    const purchase = await prisma.purchase.create({
      data: {
        buyerId,
        productId,
        productQuoteId,
        supplierId,
        quantity,
        status,
        unitCost,
        quotes,
        invoiceNumber,
      },
    })
    return purchase
  }
}
