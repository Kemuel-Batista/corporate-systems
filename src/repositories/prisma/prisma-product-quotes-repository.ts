import { ProductQuote, Prisma } from '@prisma/client'
import { ProductQuotesRepository } from '../product-quotes-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProductQuotesRepository implements ProductQuotesRepository {
  async create({
    productId,
    supplierId,
    buyerId,
    expirationDate,
    price,
    quoteDate,
  }: Prisma.ProductQuoteUncheckedCreateInput): Promise<ProductQuote> {
    const productQuote = await prisma.productQuote.create({
      data: {
        productId,
        supplierId,
        buyerId,
        expirationDate,
        price,
        quoteDate,
      },
    })
    return productQuote
  }

  async findById(id: string): Promise<ProductQuote | null> {
    const productQuote = await prisma.productQuote.findUnique({
      where: {
        id,
      },
    })

    return productQuote
  }

  async listByProductId(productId: string): Promise<ProductQuote[]> {
    const productQuotes = await prisma.productQuote.findMany({
      where: {
        productId,
      },
    })

    return productQuotes
  }

  async findLowestQuoteByProductId(
    productId: string,
  ): Promise<ProductQuote | null> {
    const productQuotes = await prisma.productQuote.findMany({
      where: {
        productId,
      },
    })

    const lowestQuote = productQuotes.reduce(
      (prev, curr) => (prev.price < curr.price ? prev : curr),
      productQuotes[0],
    )

    return lowestQuote
  }
}
