import { PaginationParams } from '@/core/repositories/pagination-params'
import { SalesWithDetails } from '@/types/sales-with-details'
import { Prisma, Sale } from '@prisma/client'

export type FilterSalesParams = PaginationParams & {
  saleDate?: Date
  invoiceNumber?: string
}

export interface SalesRepository {
  create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>
  findById(id: string): Promise<Sale | null>
  list(params: FilterSalesParams): Promise<SalesWithDetails[]>
}
