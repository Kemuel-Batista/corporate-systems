import { Prisma, SaleDetails } from '@prisma/client'

export interface SaleDetailsRepository {
  create(data: Prisma.SaleDetailsUncheckedCreateInput): Promise<SaleDetails>
  findById(id: string): Promise<SaleDetails | null>
  list(): Promise<SaleDetails[]>
  listBySaleId(saleId: string): Promise<SaleDetails[]>
}
