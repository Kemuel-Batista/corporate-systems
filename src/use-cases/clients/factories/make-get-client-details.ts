import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { GetClientDetailsUseCase } from '../get-client-details'

export function makeGetClientDetailsUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const getClientDetailsUseCase = new GetClientDetailsUseCase(clientsRepository)

  return getClientDetailsUseCase
}
