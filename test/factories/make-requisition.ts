import { Requisition } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { RequisitionStatus } from '@/enums/requisition'

export function makeRequisition(
  override: Partial<Requisition> = {},
): Requisition {
  return {
    id: randomUUID(),
    productId: randomUUID(),
    costCenterId: randomUUID(),
    quantity: faker.number.int({ max: 1000 }),
    status: RequisitionStatus.CREATED,
    createdBy: randomUUID(),
    createdAt: new Date(),
    ...override,
  }
}
