import { Prisma, Sale } from '@prisma/client'
import { SalesWithDetails } from '@/types/sales-with-details'
import {
  FilterSalesParams,
  SalesRepository,
} from '@/repositories/sales-repository'
import { InMemorySaleDetailsRepository } from './in-memory-sale-details-repository'
import { randomUUID } from 'node:crypto'

export class InMemorySalesRepository implements SalesRepository {
  public items: Sale[] = []

  constructor(private saleDetails: InMemorySaleDetailsRepository) {}

  async create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale> {
    const sale = {
      id: randomUUID(),
      clientId: data.clientId,
      invoiceNumber: data.invoiceNumber,
      saleDate: new Date(data.saleDate),
      createdBy: data.createdBy,
      createdAt: new Date(),
    }

    this.items.push(sale)

    return sale
  }

  async findById(id: string): Promise<Sale> {
    const sale = this.items.find((item) => item.id === id)

    if (!sale) {
      return null
    }

    return sale
  }

  async list({
    page,
    invoiceNumber,
    saleDate,
  }: FilterSalesParams): Promise<SalesWithDetails[]> {
    let sales = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    if (invoiceNumber !== undefined) {
      sales = sales.filter((sale) => sale.invoiceNumber === invoiceNumber)
    }

    if (saleDate !== undefined) {
      sales = sales.filter(
        (sale) => sale.saleDate.getDate() === saleDate.getDate(),
      )
    }

    const salesWithDetails: SalesWithDetails[] = []

    for (const sale of sales) {
      const saleDetails = this.saleDetails.items.filter(
        (saleDetails) => saleDetails.saleId === sale.id,
      )

      salesWithDetails.push({
        id: sale.id,
        clientId: sale.clientId,
        invoiceNumber: sale.invoiceNumber,
        saleDate: sale.saleDate,
        createdAt: sale.createdAt,
        createdBy: sale.createdBy,
        saleDetails,
      })
    }

    return salesWithDetails
  }
}
