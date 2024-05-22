import { ProductQuote, Prisma } from '@prisma/client'
import { ProductQuotesRepository } from '../../src/repositories/product-quotes-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryProductQuotesRepository
  implements ProductQuotesRepository
{
  public items: ProductQuote[] = []

  async create(
    data: Prisma.ProductQuoteUncheckedCreateInput,
  ): Promise<ProductQuote> {
    const productQuote = {
      id: randomUUID(),
      supplierId: data.supplierId,
      productId: data.productId,
      price: data.price,
      quoteDate: new Date(data.quoteDate),
      buyerId: data.buyerId,
      expirationDate: new Date(data.expirationDate),
      createdAt: new Date(),
    }

    this.items.push(productQuote)

    return productQuote
  }

  async findById(id: string): Promise<ProductQuote | null> {
    const productQuote = this.items.find((item) => item.id === id)

    if (!productQuote) {
      return null
    }

    return productQuote
  }

  async listByProductId(productId: string): Promise<ProductQuote[]> {
    const productQuotes = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.productId === productId)

    return productQuotes
  }

  async findLowestQuoteByProductId(productId: string): Promise<ProductQuote> {
    const productQuotes = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.productId === productId)

    const lowestQuote = productQuotes.reduce(
      (prev, curr) => (prev.price < curr.price ? prev : curr),
      productQuotes[0],
    )

    return lowestQuote
  }
}
