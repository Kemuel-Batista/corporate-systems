import { ClientsRepository } from '@/repositories/clients-repository'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { Client } from '@prisma/client'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'

interface EditClientUseCaseRequest {
  id: string
  name: string
  cpf: string
}

type EditClientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    client: Client
  }
>

export class EditClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    id,
    name,
    cpf,
  }: EditClientUseCaseRequest): Promise<EditClientUseCaseResponse> {
    const client = await this.clientsRepository.findById(id)

    if (!client) {
      return failure(new ResourceNotFoundError())
    }

    if (client.cpf !== cpf) {
      const existingClient = await this.clientsRepository.findByCpf(cpf)

      if (existingClient) {
        return failure(new ResourceAlreadyExistsError())
      }

      client.cpf = cpf
    }

    client.name = name

    await this.clientsRepository.update(client)

    return success({
      client,
    })
  }
}
