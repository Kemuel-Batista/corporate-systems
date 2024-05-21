import { Prisma, ProductQuote } from '@prisma/client'

export interface ProductQuotesRepository {
  create(data: Prisma.ProductQuoteUncheckedCreateInput): Promise<ProductQuote>
  findLowestQuoteByProductId(productId: string): Promise<ProductQuote | null>
  listByProductId(productId: string): Promise<ProductQuote[]>
}
