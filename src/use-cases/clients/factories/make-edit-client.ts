import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { EditClientUseCase } from '../edit-client'

export function makeEditClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const editClientUseCase = new EditClientUseCase(clientsRepository)

  return editClientUseCase
}
