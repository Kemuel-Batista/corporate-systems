import { SaleDetails } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function makeSaleDetails(
  override: Partial<SaleDetails> = {},
): SaleDetails {
  return {
    id: randomUUID(),
    productId: randomUUID(),
    saleId: randomUUID(),
    soldAmount: faker.number.int({ max: 1000 }),
    unitPrice: faker.number.int({ max: 1000 }),
    ...override,
  }
}
