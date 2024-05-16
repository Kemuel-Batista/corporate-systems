import { ProductMovement } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { MovementType } from '@/enums/product-movement'

export function makeProductMovement(
  override: Partial<ProductMovement> = {},
): ProductMovement {
  return {
    id: randomUUID(),
    productId: randomUUID(),
    warehouseId: randomUUID(),
    movementType: MovementType.ENTRY_BY_PURCHASE,
    quantity: faker.number.int({ max: 1000 }),
    value: faker.number.int({ max: 1000 }),
    createdAt: new Date(),
    ...override,
  }
}
