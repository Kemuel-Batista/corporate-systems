import { Client } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

export function makeClient(override: Partial<Client> = {}): Client {
  return {
    id: randomUUID(),
    cpf: faker.commerce.isbn(),
    name: faker.person.firstName(),
    createdAt: new Date(),
    ...override,
  }
}
