import { WarehousesRepository } from '@/repositories/warehouses-repository'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { Warehouse } from '@prisma/client'
import { Either, failure, success } from '@/core/either'

interface CreateWarehouseUseCaseRequest {
  name: string
  description: string
  status: number
  createdBy: string
}

type CreateWarehouseUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    warehouse: Warehouse
  }
>

export class CreateWarehouseUseCase {
  constructor(private warehousesRepository: WarehousesRepository) {}

  async execute({
    name,
    description,
    status,
    createdBy,
  }: CreateWarehouseUseCaseRequest): Promise<CreateWarehouseUseCaseResponse> {
    const warehouseAlreadyExists =
      await this.warehousesRepository.findByName(name)

    if (warehouseAlreadyExists) {
      return failure(new ResourceAlreadyExistsError())
    }

    const warehouse = await this.warehousesRepository.create({
      name,
      description,
      status,
      createdBy,
    })

    return success({
      warehouse,
    })
  }
}
