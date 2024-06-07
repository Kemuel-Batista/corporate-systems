import { ClientsRepository } from '@/repositories/clients-repository'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { Client } from '@prisma/client'
import { Either, failure, success } from '@/core/either'

interface CreateClientUseCaseRequest {
  name: string
  cpf: string
}

type CreateClientUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    client: Client
  }
>

export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    cpf,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const clientAlreadyExists = await this.clientsRepository.findByCpf(cpf)

    if (clientAlreadyExists) {
      return failure(new ResourceAlreadyExistsError())
    }

    const client = await this.clientsRepository.create({
      name,
      cpf,
    })

    return success({
      client,
    })
  }
}
