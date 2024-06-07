import { Prisma, Sale } from '@prisma/client'
import { FilterSalesParams, SalesRepository } from '../sales-repository'
import { prisma } from '@/lib/prisma'
import { SalesWithDetails } from '@/types/sales-with-details'

export class PrismaSalesRepository implements SalesRepository {
  async create({
    clientId,
    invoiceNumber,
    saleDate,
    createdBy,
  }: Prisma.SaleUncheckedCreateInput): Promise<Sale> {
    const sale = await prisma.sale.create({
      data: {
        clientId,
        invoiceNumber,
        saleDate,
        createdBy,
      },
    })
    return sale
  }

  async findById(id: string): Promise<Sale> {
    const sale = await prisma.sale.findUnique({
      where: {
        id,
      },
    })

    return sale
  }

  async list({
    page,
    invoiceNumber,
    saleDate,
  }: FilterSalesParams): Promise<SalesWithDetails[]> {
    const sales = await prisma.sale.findMany({
      include: {
        saleDetails: true,
      },
      take: 20,
      skip: (page - 1) * 20,
      where: {
        invoiceNumber: invoiceNumber ? { contains: invoiceNumber } : undefined,
        saleDate: saleDate
          ? {
              equals: saleDate,
            }
          : undefined,
      },
    })

    return sales
  }
}
