import { CostCenter } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { CostCenterStatus } from '@/enums/cost-center'

export function makeCostCenter(override: Partial<CostCenter> = {}): CostCenter {
  return {
    id: randomUUID(),
    name: faker.commerce.department(),
    code: faker.commerce.isbn(),
    status: CostCenterStatus.ACTIVE,
    createdBy: randomUUID(),
    createdAt: new Date(),
    updatedAt: null,
    updatedBy: null,
    ...override,
  }
}
