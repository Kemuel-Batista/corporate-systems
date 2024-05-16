import { Warehouse } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { WarehouseStatus } from '@/enums/warehouse'

export function makeWarehouse(override: Partial<Warehouse> = {}): Warehouse {
  return {
    id: randomUUID(),
    name: faker.commerce.isbn(),
    description: faker.commerce.department(),
    status: WarehouseStatus.ACTIVE,
    createdBy: randomUUID(),
    createdAt: new Date(),
    updatedAt: null,
    updatedBy: null,
    ...override,
  }
}
