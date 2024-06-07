import { Either, success } from '@/core/either'
import { ClientsRepository } from '@/repositories/clients-repository'
import { Client } from '@prisma/client'

type ListClientsUseCaseResponse = Either<
  null,
  {
    clients: Client[]
  }
>

export class ListClientsUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute(): Promise<ListClientsUseCaseResponse> {
    const clients = await this.clientsRepository.list()

    return success({
      clients,
    })
  }
}
