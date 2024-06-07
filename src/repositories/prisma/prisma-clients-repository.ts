import { Client, Prisma } from '@prisma/client'
import { ClientsRepository } from '../clients-repository'
import { prisma } from '@/lib/prisma'

export class PrismaClientsRepository implements ClientsRepository {
  async create({
    name,
    cpf,
  }: Prisma.ClientUncheckedCreateInput): Promise<Client> {
    const client = await prisma.client.create({
      data: {
        name,
        cpf,
      },
    })
    return client
  }

  async update({ id, name, cpf }: Client): Promise<Client> {
    const client = await prisma.client.update({
      where: {
        id,
      },
      data: {
        name: name ?? undefined,
        cpf: cpf ?? undefined,
      },
    })

    return client
  }

  async findById(id: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    return client
  }

  async findByCpf(cpf: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: {
        cpf,
      },
    })

    return client
  }

  async list(): Promise<Client[]> {
    const clients = await prisma.client.findMany()

    return clients
  }

  async delete(id: string): Promise<void> {
    await prisma.client.delete({
      where: {
        id,
      },
    })
  }
}
