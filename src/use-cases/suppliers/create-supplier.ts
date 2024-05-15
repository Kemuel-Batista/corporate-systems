import { SuppliersRepository } from '@/repositories/suppliers-repository'
import { ResourceAlreadyExistsError } from '../errors/resource-already-exists-error'
import { Supplier } from '@prisma/client'
import { Either, failure, success } from '@/core/either'

interface CreateSupplierUseCaseRequest {
  name: string
  description: string
  status: number
  createdBy: string
}

type CreateSupplierUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    supplier: Supplier
  }
>

export class CreateSupplierUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute({
    name,
    description,
    status,
    createdBy,
  }: CreateSupplierUseCaseRequest): Promise<CreateSupplierUseCaseResponse> {
    const supplierAlreadyExists =
      await this.suppliersRepository.findByName(name)

    if (supplierAlreadyExists) {
      return failure(new ResourceAlreadyExistsError())
    }

    const supplier = await this.suppliersRepository.create({
      name,
      description,
      status,
      createdBy,
    })

    return success({
      supplier,
    })
  }
}
