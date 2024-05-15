import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { SupplierStatus } from '@/enums/supplier'

interface SupplierProps extends Prisma.SupplierUncheckedCreateInput {}

export function makeSupplier(
  override: Partial<SupplierProps> = {},
): SupplierProps {
  return {
    name: faker.commerce.isbn(),
    description: faker.commerce.department(),
    status: SupplierStatus.ACTIVE,
    createdBy: randomUUID(),
    ...override,
  }
}
