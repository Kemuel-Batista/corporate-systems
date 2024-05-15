import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

interface DepartmentProps extends Prisma.DepartmentUncheckedCreateInput {}

export function makeDepartment(
  override: Partial<DepartmentProps> = {},
): DepartmentProps {
  return {
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    createdBy: randomUUID(),
    ...override,
  }
}
