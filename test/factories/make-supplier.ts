import { Supplier } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { SupplierStatus } from '@/enums/supplier'

export function makeSupplier(override: Partial<Supplier> = {}): Supplier {
  return {
    id: randomUUID(),
    name: faker.commerce.isbn(),
    description: faker.commerce.department(),
    status: SupplierStatus.ACTIVE,
    createdBy: randomUUID(),
    createdAt: new Date(),
    updatedAt: null,
    updatedBy: null,
    ...override,
  }
}
