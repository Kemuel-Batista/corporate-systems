import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { WarehouseStatus } from '@/enums/warehouse'

interface WarehouseProps extends Prisma.WarehouseUncheckedCreateInput {}

export function makeWarehouse(
  override: Partial<WarehouseProps> = {},
): WarehouseProps {
  return {
    name: faker.commerce.isbn(),
    description: faker.commerce.department(),
    status: WarehouseStatus.ACTIVE,
    createdBy: randomUUID(),
    ...override,
  }
}
