import { Either, failure, success } from '@/core/either'
import { ClientsRepository } from '@/repositories/clients-repository'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'

interface DeleteClientUseCaseRequest {
  id: string
}

type DeleteClientUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    id,
  }: DeleteClientUseCaseRequest): Promise<DeleteClientUseCaseResponse> {
    const client = await this.clientsRepository.findById(id)

    if (!client) {
      return failure(new ResourceNotFoundError())
    }

    await this.clientsRepository.delete(id)

    return success(null)
  }
}
