import { SaleDetailsRepository } from '@/repositories/sale-details-repository'
import { Prisma, SaleDetails } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemorySaleDetailsRepository implements SaleDetailsRepository {
  public items: SaleDetails[] = []

  async create(
    data: Prisma.SaleDetailsUncheckedCreateInput,
  ): Promise<SaleDetails> {
    const saleDetails = {
      id: randomUUID(),
      saleId: data.saleId,
      productId: data.productId,
      soldAmount: data.soldAmount,
      unitPrice: data.unitPrice,
    }

    this.items.push(saleDetails)

    return saleDetails
  }

  async findById(id: string): Promise<SaleDetails> {
    const saleDetails = this.items.find((item) => item.id === id)

    if (!saleDetails) {
      return null
    }

    return saleDetails
  }

  async list(): Promise<SaleDetails[]> {
    const saleDetails = this.items

    return saleDetails
  }

  async listBySaleId(saleId: string): Promise<SaleDetails[]> {
    const saleDetails = this.items.filter((item) => item.saleId === saleId)

    return saleDetails
  }
}
