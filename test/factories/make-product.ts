import { Product } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { ProductStatus } from '@/enums/product'

export function makeProduct(override: Partial<Product> = {}): Product {
  return {
    id: randomUUID(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    status: ProductStatus.ACTIVE,
    createdBy: randomUUID(),
    createdAt: new Date(),
    updatedAt: null,
    updatedBy: null,
    ...override,
  }
}
