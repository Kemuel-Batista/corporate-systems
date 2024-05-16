import { Either, failure, success } from '@/core/either'
import { SuppliersRepository } from '@/repositories/suppliers-repository'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'
import { Supplier } from '@prisma/client'

interface GetSupplierDetailsUseCaseRequest {
  id: string
}

type GetSupplierDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    supplier: Supplier
  }
>

export class GetSupplierDetailsUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute({
    id,
  }: GetSupplierDetailsUseCaseRequest): Promise<GetSupplierDetailsUseCaseResponse> {
    const supplier = await this.suppliersRepository.findById(id)

    if (!supplier) {
      return failure(new ResourceNotFoundError())
    }

    return success({
      supplier,
    })
  }
}
