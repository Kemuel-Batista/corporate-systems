import { Prisma, SaleDetails } from '@prisma/client'
import { SaleDetailsRepository } from '../sale-details-repository'
import { prisma } from '@/lib/prisma'

export class PrismaSaleDetailsRepository implements SaleDetailsRepository {
  async create({
    saleId,
    productId,
    soldAmount,
    unitPrice,
  }: Prisma.SaleDetailsUncheckedCreateInput): Promise<SaleDetails> {
    const saleDetails = await prisma.saleDetails.create({
      data: {
        saleId,
        productId,
        soldAmount,
        unitPrice,
      },
    })

    return saleDetails
  }

  async findById(id: string): Promise<SaleDetails> {
    const saleDetails = await prisma.saleDetails.findUnique({
      where: {
        id,
      },
    })

    return saleDetails
  }

  async list(): Promise<SaleDetails[]> {
    const saleDetails = await prisma.saleDetails.findMany()

    return saleDetails
  }

  async listBySaleId(saleId: string): Promise<SaleDetails[]> {
    const saleDetails = await prisma.saleDetails.findMany({
      where: {
        saleId,
      },
    })

    return saleDetails
  }
}
