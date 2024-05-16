import { WarehousesRepository } from '@/repositories/warehouses-repository'
import { ResourceAlreadyExistsError } from '../../core/errors/resource-already-exists-error'
import { Warehouse } from '@prisma/client'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '../../core/errors/resource-not-found-error'

interface EditWarehouseUseCaseRequest {
  id: string
  name: string
  description: string
  status: number
  updatedBy: string
}

type EditWarehouseUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    warehouse: Warehouse
  }
>

export class EditWarehouseUseCase {
  constructor(private warehousesRepository: WarehousesRepository) {}

  async execute({
    id,
    name,
    description,
    status,
    updatedBy,
  }: EditWarehouseUseCaseRequest): Promise<EditWarehouseUseCaseResponse> {
    const warehouse = await this.warehousesRepository.findById(id)

    if (!warehouse) {
      return failure(new ResourceNotFoundError())
    }

    if (warehouse.name !== name) {
      const existingWarehouse = await this.warehousesRepository.findByName(name)

      if (existingWarehouse) {
        return failure(new ResourceAlreadyExistsError())
      }

      warehouse.name = name
    }

    warehouse.description = description
    warehouse.status = status
    warehouse.updatedBy = updatedBy

    await this.warehousesRepository.update(warehouse)

    return success({
      warehouse,
    })
  }
}
