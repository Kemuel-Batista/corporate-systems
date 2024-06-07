import { Sale } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function makeSale(override: Partial<Sale> = {}): Sale {
  return {
    id: randomUUID(),
    clientId: randomUUID(),
    invoiceNumber: faker.commerce.isbn(13),
    saleDate: new Date(),
    createdAt: new Date(),
    createdBy: randomUUID(),
    ...override,
  }
}
