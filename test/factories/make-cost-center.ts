import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { CostCenterStatus } from '@/enums/cost-center'

interface CostCenterProps extends Prisma.CostCenterUncheckedCreateInput {}

export function makeCostCenter(
  override: Partial<CostCenterProps> = {},
): CostCenterProps {
  return {
    name: faker.commerce.department(),
    code: faker.commerce.isbn(),
    status: CostCenterStatus.ACTIVE,
    createdBy: randomUUID(),
    ...override,
  }
}
