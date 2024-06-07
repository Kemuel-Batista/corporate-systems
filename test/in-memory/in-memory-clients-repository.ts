import { Client, Prisma } from '@prisma/client'
import { ClientsRepository } from '../../src/repositories/clients-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  async create(data: Prisma.ClientUncheckedCreateInput): Promise<Client> {
    const client = {
      id: randomUUID(),
      name: data.name,
      cpf: data.cpf,
      createdAt: new Date(),
    }

    this.items.push(client)

    return client
  }

  async update(data: Client): Promise<Client> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const client = this.items[itemIndex]

    const clientUpdated = {
      ...client,
      name: data.name,
      cpf: data.cpf,
    }

    this.items[itemIndex] = clientUpdated

    return client
  }

  async findById(id: string): Promise<Client | null> {
    const client = this.items.find((item) => item.id === id)

    if (!client) {
      return null
    }

    return client
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    const client = this.items.find((item) => item.cpf === cpf)

    if (!client) {
      return null
    }

    return client
  }

  async list(): Promise<Client[]> {
    const clients = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return clients
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
