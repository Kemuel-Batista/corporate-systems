import { Prisma } from '@prisma/client'

type SalesWithDetails = Prisma.SaleGetPayload<{
  include: { saleDetails: true }
}>

export type { SalesWithDetails }
