import { Either, failure, success } from '@/core/either'
import { SuppliersRepository } from '@/repositories/suppliers-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteSupplierUseCaseRequest {
  id: string
}

type DeleteSupplierUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteSupplierUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute({
    id,
  }: DeleteSupplierUseCaseRequest): Promise<DeleteSupplierUseCaseResponse> {
    const supplier = await this.suppliersRepository.findById(id)

    if (!supplier) {
      return failure(new ResourceNotFoundError())
    }

    await this.suppliersRepository.delete(id)

    return success(null)
  }
}
