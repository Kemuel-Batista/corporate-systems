import { User } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function makeUser(override: Partial<User> = {}): User {
  return {
    id: randomUUID(),
    name: faker.commerce.isbn(),
    email: faker.commerce.department(),
    passwordHash: randomUUID(),
    departmentId: randomUUID(),
    createdAt: new Date(),
    ...override,
  }
}
