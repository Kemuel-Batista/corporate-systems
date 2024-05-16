import { Department } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function makeDepartment(override: Partial<Department> = {}): Department {
  return {
    id: randomUUID(),
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    createdBy: randomUUID(),
    createdAt: new Date(),
    updatedAt: null,
    updatedBy: null,
    deletedAt: null,
    deletedBy: null,
    ...override,
  }
}
