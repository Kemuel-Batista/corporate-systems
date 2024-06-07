import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { ListClientsUseCase } from '../list-client'

export function makeListClientsUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const listClientsUseCase = new ListClientsUseCase(clientsRepository)

  return listClientsUseCase
}
