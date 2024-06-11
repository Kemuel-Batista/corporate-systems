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

  async update({ id, status }: Purchase): Promise<Purchase> {
    const purchase = await prisma.purchase.update({
      where: {
        id,
      },
      data: {
        status: status ?? undefined,
      },
    })

    return purchase
  }

  async findById(id: string): Promise<Purchase | null> {
    const purchase = await prisma.purchase.findUnique({
      where: {
        id,
      },
    })

    return purchase
  }

  async list(): Promise<Purchase[]> {
    const purchases = await prisma.purchase.findMany()

    return purchases
  }
}
