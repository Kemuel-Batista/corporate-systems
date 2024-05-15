import { SuppliersRepository } from '@/repositories/suppliers-repository'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { Supplier } from '@prisma/client'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface EditSupplierUseCaseRequest {
  id: string
  name: string
  description: string
  status: number
  updatedBy: string
}

type EditSupplierUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    supplier: Supplier
  }
>

export class EditSupplierUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute({
    id,
    name,
    description,
    status,
    updatedBy,
  }: EditSupplierUseCaseRequest): Promise<EditSupplierUseCaseResponse> {
    const supplier = await this.suppliersRepository.findById(id)

    if (!supplier) {
      return failure(new ResourceNotFoundError())
    }

    if (supplier.name !== name) {
      const existingSupplier = await this.suppliersRepository.findByName(name)

      if (existingSupplier) {
        return failure(new ResourceAlreadyExistsError())
      }

      supplier.name = name
    }

    supplier.description = description
    supplier.status = status
    supplier.updatedBy = updatedBy

    await this.suppliersRepository.update(supplier)

    return success({
      supplier,
    })
  }
}
