import { Purchase } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { PurchaseStatus } from '@/enums/purchase'

export function makePurchase(override: Partial<Purchase> = {}): Purchase {
  return {
    id: randomUUID(),
    supplierId: randomUUID(),
    productId: randomUUID(),
    productQuoteId: randomUUID(),
    buyerId: randomUUID(),
    quantity: faker.number.int({ max: 1000 }),
    unitCost: faker.number.int({ max: 1000 }),
    status: PurchaseStatus.PENDING,
    quotes: faker.number.int({ max: 1000 }),
    invoiceNumber: faker.commerce.isbn(13),
    createdAt: new Date(),
    ...override,
  }
}
