import { ProductQuote } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function makeProductQuote(
  override: Partial<ProductQuote> = {},
): ProductQuote {
  return {
    id: randomUUID(),
    productId: randomUUID(),
    supplierId: randomUUID(),
    buyerId: randomUUID(),
    price: faker.number.int({ max: 10000 }),
    quoteDate: faker.date.recent(),
    expirationDate: faker.date.recent(),
    createdAt: new Date(),
    ...override,
  }
}
