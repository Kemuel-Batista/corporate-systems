import { Prisma, Requisition } from '@prisma/client'

export interface RequisitionsRepository {
  create(data: Prisma.RequisitionUncheckedCreateInput): Promise<Requisition>
  findById(id: string): Promise<Requisition | null>
  list(): Promise<Requisition[]>
  listByProductId(productId: string): Promise<Requisition[]>
  cancel(id: string): Promise<void>
}
