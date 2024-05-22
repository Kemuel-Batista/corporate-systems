import { Prisma, Purchase } from '@prisma/client'

export interface PurchasesRepository {
  create(data: Prisma.PurchaseUncheckedCreateInput): Promise<Purchase>
}
