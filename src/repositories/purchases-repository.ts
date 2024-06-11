import { Prisma, Purchase } from '@prisma/client'

export interface PurchasesRepository {
  create(data: Prisma.PurchaseUncheckedCreateInput): Promise<Purchase>
  update(data: Purchase): Promise<Purchase>
  findById(id: string): Promise<Purchase | null>
  list(): Promise<Purchase[]>
}
