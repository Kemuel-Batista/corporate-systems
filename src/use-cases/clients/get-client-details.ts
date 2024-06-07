import { Either, failure, success } from '@/core/either'
import { ClientsRepository } from '@/repositories/clients-repository'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'
import { Client } from '@prisma/client'

interface GetClientDetailsUseCaseRequest {
  id: string
}

type GetClientDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    client: Client
  }
>

export class GetClientDetailsUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    id,
  }: GetClientDetailsUseCaseRequest): Promise<GetClientDetailsUseCaseResponse> {
    const client = await this.clientsRepository.findById(id)

    if (!client) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      client,
    })
  }
}
