import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { ProductStatus } from '@/enums/product'

interface ProductProps extends Prisma.ProductUncheckedCreateInput {}

export function makeProduct(
  override: Partial<ProductProps> = {},
): ProductProps {
  return {
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    status: ProductStatus.ACTIVE,
    createdBy: randomUUID(),
    ...override,
  }
}
